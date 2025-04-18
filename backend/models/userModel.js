const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      unique: true,
    },
    fName: {
      type: String,
      required: [true, "Name is required"],
    },
    lName: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required and should be unique"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    budgetLimit: {
      type: Number,
      required: [false, "Budget limit is required"],
    },
    budgets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Budget", // Reference to the Expense model
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
