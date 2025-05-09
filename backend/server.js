const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const budgetRoute = require("./routes/budgetRoute");
const authenticateToken = require("./middleware/authMiddleware"); // middleware

dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://budget-tracking-app-fe.vercel.app",
      "http://localhost:5173", // React dev server
      "http://127.0.0.1:3000",
    ],
    credentials: true,
  })
);

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

// app.get("/", (req, res) => {
//   res.send("Welcome to the API");
// });
// ✅ Public routes — NO token required
// app.use(userRoute); // /login and /register

// ✅ Protected routes — token REQUIRED
// app.use("/user_budget", authenticateToken, budgetRoute);

//OldRoute

app.use(userRoute);
app.use(budgetRoute);
