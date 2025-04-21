// backend/app.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoute = require("./routes/userRoute");
const budgetRoute = require("./routes/budgetRoute");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/user", userRoute);
app.use("/budget", budgetRoute);

// DB connection
mongoose
  .connect(process.env.URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = app; // Export plain Express app
