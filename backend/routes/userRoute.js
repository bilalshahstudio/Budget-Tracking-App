const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");

const {
  loginController,
  registerController,
} = require("../controllers/userController");

const router = express.Router();

//Routers
//POST || Login User
router.post("/login", loginController);

//POST || Register User
router.post("/register", registerController);

//Create Data
// router.post("/", async (req, res) => {
//   const { name, email, password, date, purchase } = req.body;

//   // const User = require("./models/userModel");
//   try {
//     const userAdded = await User.create({
//       name: name,
//       email: email,
//       password: password,
//       date: date,
//       purchase: purchase,
//     });

//     res.status(201).json(userAdded);
//   } catch (error) {
//     console.log(error);

//     res.status(400).json({ error: error.message });
//   }
// });

//Get or Read All Data
router.get("/users", async (req, res) => {
  try {
    const showAllData = await User.find();

    res.status(200).json(showAllData);
  } catch (error) {
    console.log(error);

    res.send(500).json({ error: error.message });
  }
});

//Update Data
// router.get("/users", async (req, res) => {
//   // const { name, email, password, date, purchase } = req.body;

//   try {
//     const users = await User.find({});

//     if (!users || users.length === 0) {
//       return res.status(404).json({ message: "No users found" });
//     }

//     console.log("Users fetched:", users);

//     res.status(200).json(users);
//   } catch (error) {
//     console.log(error);

//     res.send(500).json({ error: error.message });
//   }
// });

//Get or Read Single Data
// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const singleUserData = await User.findById({ _id: id });

//     res.status(200).json(singleUserData);
//   } catch (error) {
//     console.log(error);

//     res.sendStatus(500).json({ error: error.message });
//   }
// });

//Delete Data
// router.delete("/expense/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const singleUserData = await User.findByIdAndDelete({ _id: id });

//     res.status(200).json(singleUserData);
//   } catch (error) {
//     console.log(error);

//     res.send(500).json({ error: error.message });
//   }
// });

//Update Data
// router.patch("/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name, email, password, date, purchase } = req.body;

//   try {
//     const updateUserData = await User.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });

//     res.status(200).json(updateUserData);
//   } catch (error) {
//     console.log(error);

//     res.send(500).json({ error: error.message });
//   }
// });

module.exports = router;
