import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

import transporter from "../Config/transporter.js";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const OTP = Math.floor(100000 + Math.random() * 900000).toString();

    const OTP_expire = Date.now() + 5 * 60 * 1000;

    const newUser = await User.create({
      name,
      email,
      password: hashedPass,
      OTP,
      OTP_expire
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    if (!token) {
      return res.status(400).json({ message: "Token generation failed" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    

    // await newUser.updateOne({ OTP });

    const mailOptions = {
      from: process.env.SENDER,
      to: email,
      subject: "OTP for Whispr",
      html: `
        <h2>Login OTP</h2>
          <p>Your OTP is:</p>
          <h1>${OTP}</h1>
          <p>This code expires in 5 minutes.</p>
        `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      success: true,
      message: "User logged in successfully",
      user: newUser,
    });
  } catch (e) {
    console.error("Error during registration:", e);
    return res
      .status(400)
      .json({ message: "User NOT created", error: e.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User NOT found" });
    }

    const comparePass = await bcrypt.compare(password, existingUser.password);

    if (!comparePass) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    if (!token) {
      return res.status(400).json({ message: "Token generation failed" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: existingUser,
    });
  } catch (e) {
    console.error("Error during login:", e);
    return res
      .status(404)
      .json({ message: "User NOT found", error: e.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (e) {
    console.error("Error during logout:", e);
    return res
      .status(500)
      .json({ message: "User NOT logged out", error: e.message });
  }
};

export const verify_OTP = async (req, res) => {
  try {
    const { userId, OTP } = req.body;

    const user = await User.findById(userId);

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }
    
    if( user.OTP === null || user.OTP !== OTP ){
      return res.status(401).json({
        success: false,
        message: "Invalid OTP. Please try again."
      })
    }

    if(user.OTP_expire < Date.now()){
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one."
      })
    }

    user.OTP = null;
    user.OTP_expire = 0;
    user.isAuthenticated = true;

    await user.save()

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (e) {
    console.error("Error during OTP sending:", e);
    return res
      .status(500)
      .json({ message: "Failed to send OTP", error: e.message });
  }
};

export const getUserDetail = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId).select("-password");

    return res.status(200).json({
      success: true,
      message: "User details Fetched successfully",
      user: user
    })
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Failed to get user details"
    })
  }
} 

export const checkAuth = async () => {
  try {
    
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Failed to check user Auth"
    })
  }
}