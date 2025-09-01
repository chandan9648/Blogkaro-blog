// controllers/userController.js
import User from "../models/User.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// REGISTER CONTROLLER

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" }); //  return
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" }); //  return
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role === "admin" ? "admin" : "user",
    });

    return res.status(201).json({
      success: true,
      message: "Registered successfully",
      userId: newUser._id,
      role: newUser.role,
    });
  } catch (err) {
    console.error("Register Error:", err.message);
    return res
      .status(500)
      .json({ message: "Server error during registration" });
  }
};

//LOGIN CONTROLLER

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({
         id: existingUser._id },
        process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.status(200).json({
      token,
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DASHBOARD CONTROLLER

export const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const blogs = await Blog.countDocuments({ author: userId });
    const comments = await Comment.countDocuments({ user: userId });
    const drafts = await Blog.countDocuments({ author: userId, isDraft: true });

    const recentBlogs = await Blog.find({ author: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title createdAt");

    res.status(200).json({
      success: true,
      dashboardData: {
        blogs,
        comments,
        drafts,
        recentBlogs,
      },
    });
  } catch (error) {
    console.error("User Dashboard Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to load user dashboard" });
  }
};
