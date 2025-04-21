const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoute = require("./routes/userRoute");
const budgetRoute = require("./routes/budgetRoute");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Your routes
app.use("/user", userRoute);
app.use("/budget", budgetRoute);

// Connect to MongoDB
mongoose
  .connect(process.env.URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Export for serverless
module.exports = serverless(app);
