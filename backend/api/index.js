const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoute = require("../api/routes/userRoute");
const budgetRoute = require("../api/routes/budgetRoute");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRoute);
app.use("/budget", budgetRoute);

// Don’t listen to a port in serverless
mongoose
  .connect(process.env.URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = serverless(app);
