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

    const { _id, budgetName, price, date } = req.body;

    if (_id) {
      const existingBudget = await Budget.findOne({ _id, userId });

      if (!existingBudget) {
        return res
          .status(404)
          .json({ message: "Budget not found or unauthorized" });
      }

      const updatedBudget = User.findByIdAndUpdate(
        id,
        { $push: { budgets: newBudget._id } }, // Push budget ID into user's budgets array
        { new: true }
      );
      return res.status(200).json({
        message: "Budget updated successfully",
        budget: updatedBudget,
      });
    } else {
      const addBudget = new Budget({
        userId: id,
        budgetName,
        price,
        date,
      });
      const newBudget = await addBudget.save();
      return res
        .status(200)
        .json({ message: "Budget data saved successfully", budget: newBudget });
    }

    // const singleUserData = await User.findById({ _id: id });

    // const addBudget = new Budget({
    //   userId: id,
    //   budgetName,
    //   price,
    //   date,
    // });

    // await User.findByIdAndUpdate(
    //   id,
    //   { $push: { budgets: newBudget._id } }, // Push budget ID into user's budgets array
    //   { new: true }
    // );

    // res
    //   .status(200)
    //   .json({ message: "Budget data saved successfully", budget: newBudget });
  } catch (error) {
    console.log(error);

    res
      .sendStatus(500)
      .json({ message: "Error saving budget data", error: error.message });
  }
});

// router.delete("/user_budget", authenticateToken, async (req, res) => {
//   try {
//     const id = req.user.userId;
//     // const { budgets } = req.body;

//     // const deletedBudget = await User.findByIdAndDelete(id, { budgets });4

//     const deletedBudget = await User.findByIdAndDelete({ Budget });

//     // await User.findOneAndDelete({  _id: id,  });

//     if (!deletedBudget) {
//       return res
//         .status(404)
//         .json({ message: "Budget not found or unauthorized" });
//     }

//     // Remove the budget ID from the user's budgets array
//     // await User.findByIdAndUpdate(userId, { $pull: { budgets: id } });

//     res.status(200).json({ message: "Budget deleted successfully" });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: "Error deleting budget", error: error.message });
//   }
// });

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
