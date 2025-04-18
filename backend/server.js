const express = require("express");
const app = express();
const serverless = require("serverless-http");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const budgetRoute = require("./routes/budgetRoute");

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(userRoute);
app.use(budgetRoute);

// Connect to MongoDB outside of handler function
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // Connect to database
  const client = await mongoose.connect(process.env.URI);
  cachedDb = client;
  return cachedDb;
}

// For local development
if (process.env.NODE_ENV !== "production") {
  connectToDatabase()
    .then(() => {
      console.log("connected successfully");
      app.listen(process.env.PORT || 8000, (err) => {
        if (err) console.log(err);
        console.log("running at port", process.env.PORT);
      });
    })
    .catch((error) => {
      console.log("error", error);
    });
}

// Serverless handler
const handler = async (event, context) => {
  // Make sure to add this so you can re-use `cachedDb` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false;

  // Connect to database
  await connectToDatabase();

  // Pass request to express app
  return serverless(app)(event, context);
};

module.exports = handler;
