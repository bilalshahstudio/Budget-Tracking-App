const express = require("express");
const User = require("../models/userModel");
const Budget = require("../models/budgetModel");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/user_budget", authenticateToken, async (req, res) => {
  try {
    const singleUserData = await User.findById({ _id: req.user.userId });

    res.status(200).json(singleUserData);
  } catch (error) {
    console.log(error);

    res.sendStatus(500).json({ error: error.message });
  }
});

router.post("/user_budget", authenticateToken, async (req, res) => {
  try {
    const id = req.user.userId;
    //const singleUserData = await User.findById({ _id: id });

    const { budgetName, price } = req.body;

    const addBudget = await Budget.create({
      userId: id,
      budgetName,
      price,
    });

    res.status(200).json(addBudget);
  } catch (error) {
    console.log(error);

    res.sendStatus(500).json({ error: error.message });
  }
});

module.exports = router;
