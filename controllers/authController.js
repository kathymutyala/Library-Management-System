const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config(); // Ensure environment variables are loaded

exports.register = async (req, res) => {
  const { username, password, dob } = req.body;

  // Validate input
  if (!username || !password || !dob) {
    return res
      .status(400)
      .json({ message: "Username, password, and date of birth are required." });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findByUsername(username); // Ensure this is called correctly
    if (existingUser.length > 0) {
      // Adjust based on results format
      return res.status(409).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      dob,
    });

    // Calculate the user's age
    const age = new Date().getFullYear() - new Date(dob).getFullYear();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.insertId, age }, // Use insertId if you're using MySQL
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Registration Token:", token); // Log token for debugging

    // Send token, age, and message to frontend
    return res.status(201).json({
      message: "User registered successfully!",
      token,
      age,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Login user
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const users = await User.findByUsername(username); // This returns an array
    const user = users.length > 0 ? users[0] : null; // Access the first user

    console.log("Retrieved User:", user); // Log the user object

    if (!user) return res.status(404).json({ error: "User not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password." });

    // Calculate the user's age from dob
    const age = new Date().getFullYear() - new Date(user.dob).getFullYear();

    // Generate JWT token with user ID and age payload
    const token = jwt.sign({ id: user.id, age }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token and age in the response
    res.status(200).json({
      message: "Login successful",
      token,
      age,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed." });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token"); // If using cookies to store JWT
  res.status(200).json({ message: "Logged out successfully." });
};
