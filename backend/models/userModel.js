const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
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
    date: {
      type: String,
    },
    purchase: { type: String },
    price: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
