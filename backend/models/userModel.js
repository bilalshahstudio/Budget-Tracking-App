const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    id: {
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
    budget: {
      type: Number,
    },
    expense: {
      type: String,
    },
    expenseDate: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
