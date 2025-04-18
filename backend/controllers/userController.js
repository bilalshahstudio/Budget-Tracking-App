const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");

//Login Callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("User Not Found");
    }

    // Check if _id is a valid ObjectId
    if (!user._id || !mongoose.Types.ObjectId.isValid(user._id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET
      // {
      //   expiresIn: "1h",
      // }
    );

    res.status(200).json({ token, success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

//Register Callback
const registerController = async (req, res) => {
  try {
    const userData = {
      ...req.body,
      userID: uuidv4(), // Generate unique userID
    };
    const newUser = new userModel(userData);
    await newUser.save();
    res.status(201).json({ success: true, newUser });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};
module.exports = { loginController, registerController };
