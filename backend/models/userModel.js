const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
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
