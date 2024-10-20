const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController"); // Ensure these are correctly imported

// Register route
router.post("/register", register); // Ensure this matches the export in the controller

// Login route
router.post("/login", login);

//Logout route
router.post("/logout", logout);

module.exports = router;
