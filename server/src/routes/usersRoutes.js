import express from "express";
import User from "../models/User.js";
import { userAuth, adminAuth } from "../middleware/userAuth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import transporter from "../config/nodemailer.js";

const router = express.Router();

// Retrieve all users
router.get("/", async (_, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(`Error in fetching users: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Find user by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error in retrieving user", error.message);
    res.status(500).json({ message: "Internal service error" });
  }
});

// Create a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      console.log("All registration fields required");
      return res.status(400).json({ message: "Please provide all input fields" });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("User already exists. Register failed.");
        return res.status(400).json({ message: "User already exists with same email" });
      }
    } catch (error) {
      console.log("Error with searching for existing user");
      return res.status(500).json({ message: "Error with searching for existing user" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, //process.env.NODE_ENV === "production",
      sameSite: "none", //process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000
    });

    // Sending welcome email to new user
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to ShopSmart!",
      text: `Thank you for signing up at ShopSmart. We hope you find the greatest deals and enjoy your stay. The email you used to sign up with your ShopSmart account is: ${email}`
    }

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log("Error with mail transporter", error);
    }

    res.status(201).json({ user: { userId: user._id, username, email, isAdmin: user.isAdmin }, message: "New user successfully created" });
  } catch (error) {
    console.error(`Error in creating user: ${error.message}`);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Login an existing user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all input fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password." });
    }

    const isMatch = await user.comparePassword(password); // or bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect email or password." });
    }

    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, //process.env.NODE_ENV === "production",
      sameSite: "none", //process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ user: { userId: user._id, username: user.username, email, isAdmin: user.isAdmin }, message: "Successfully logged in" });
  } catch (error) {
    console.error(`Error in logging in user: ${error.message}`);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Logout existing user
router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, //process.env.NODE_ENV === "production",
      sameSite: "none", //process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    res.status(500).json({ message: "Server error, unable to log out. Please try again later." });
  }
});

// Check if user is logged in
router.get('/check-auth', async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ loggedIn: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ loggedIn: true, user: decoded })
  } catch (error) {
    res.clearCookie("token");
    res.status(401).json({ loggedIn: false });
  }
});

// Enables user profile screen if logged in
router.get('/profile', userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log("Error with profile endpoint", error);
    res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
  }
});

// Enables checkout screen if logged in
router.get('/checkout', userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Loads admin panel upon successful access
router.get('/admin', userAuth, adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Update a user by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updating user:", error.message);
    res.status(500).json({ message: "Internal service error" });
  }
});

// Delete a user by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    console.error("Error in deleting user:", error.message);
    res.status(500).json({ message: "Internal service error" });
  }
});

export default router;