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

// router.post("/user_budget", authenticateToken, async (req, res) => {
//   try {
//     const id = req.user.userId;
//     //const singleUserData = await User.findById({ _id: id });

//     const { budgetName, price } = req.body;

//     const addBudget = await Budget.create({
//       userId: id,
//       budgetName,
//       price,
//     });

//     res.status(200).json(addBudget);
//   } catch (error) {
//     console.log(error);

//     res.sendStatus(500).json({ error: error.message });
//   }
// });

router.post("/user_budget", authenticateToken, async (req, res) => {
  try {
    const id = req.user.userId;
    //const singleUserData = await User.findById({ _id: id });

    const { budgetName, price } = req.body;

    const addBudget = new Budget({
      userId: id,
      budgetName,
      price,
    });

    const newBudget = await addBudget.save();

    await User.findByIdAndUpdate(
      id,
      { $push: { budgets: newBudget._id } }, // Push budget ID into user's budgets array
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Budget data saved successfully", budget: newBudget });
  } catch (error) {
    console.log(error);

    res
      .sendStatus(500)
      .json({ message: "Error saving budget data", error: error.message });
  }
});

router.delete("/user_budget/", authenticateToken, async (req, res) => {
  try {
    const id = req.user.userId;
    const { budgetName, price } = req.body;

    const deleteBudget = await deleteBudget.delete();

    await User.findOneAndDelete({ _id: id, userId });

    if (!deletedBudget) {
      return res
        .status(404)
        .json({ message: "Budget not found or unauthorized" });
    }

    // Remove the budget ID from the user's budgets array
    await User.findByIdAndUpdate(userId, { $pull: { budgets: id } });

    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error deleting budget", error: error.message });
  }
});

module.exports = router;
