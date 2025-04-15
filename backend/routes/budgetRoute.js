const express = require("express");
const User = require("../models/userModel");
const Budget = require("../models/budgetModel");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/user_budget", authenticateToken, async (req, res) => {
  try {
    const singleUserData = await User.findById({
      _id: req.user.userId,
    }).populate("budgets");

    res.status(200).json(singleUserData);
  } catch (error) {
    console.log(error);

    res.sendStatus(500).json({ error: error.message });
  }
});

router.post("/user_budget", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { _id, budgetName, price, date } = req.body;

    if (_id) {
      //Edit existing budget
      const existingBudget = await Budget.findOne({ _id, userId });
      if (!existingBudget) {
        return res
          .status(404)
          .json({ message: "Budget not found or unauthorized" });
      }

      const updatedBudget = await Budget.findByIdAndUpdate(
        _id,
        { budgetName, price, date },
        { new: true }
      );

      return res.status(200).json({
        message: "Budget updated successfully",
        budget: updatedBudget,
      });
    } else {
      // Adding new budget
      const addBudget = new Budget({
        userId,
        budgetName,
        price,
        date,
      });

      const newBudget = await addBudget.save();

      await User.findByIdAndUpdate(
        userId,
        { $push: { budgets: newBudget._id } },
        { new: true }
      );

      return res.status(200).json({
        message: "Budget data saved successfully",
        budget: newBudget,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error saving or updating budget data",
      error: error.message,
    });
  }
});

router.delete("/user_budget/:budgetId", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Get the logged-in user's ID
    const { budgetId } = req.params; // Get the budget ID from request parameters

    // Check if the budget exists and belongs to the user
    const budget = await Budget.findOne({ _id: budgetId, userId });

    if (!budget) {
      return res
        .status(404)
        .json({ message: "Budget not found or unauthorized" });
    }

    // Delete the budget from the Budget collection
    await Budget.findByIdAndDelete(budgetId);

    // Remove the budget ID from the user's budgets array
    await User.findByIdAndUpdate(userId, { $pull: { budgets: budgetId } });

    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error("Error deleting budget:", error);
    res
      .status(500)
      .json({ message: "Error deleting budget", error: error.message });
  }
});

module.exports = router;
