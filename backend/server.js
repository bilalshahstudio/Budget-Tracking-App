const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const budgetRoute = require("./routes/budgetRoute");

dotenv.config();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("connected successfuly");
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log(err);
      console.log("running at port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("error", error);
  });

app.use(userRoute);
app.use(budgetRoute);
