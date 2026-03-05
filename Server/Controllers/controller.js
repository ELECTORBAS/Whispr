import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

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

    const newUser = await User.create({
      name,
      email,
      password: hashedPass,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    if(!token){
      return res.status(400).json({message: "Token generation failed"})
    }

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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

    if(!comparePass){
        return res.status(400).json({ message: "Invalid credentials"})
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    })

    if (!token) {
      return res.status(400).json({ message: "Token generation failed" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
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
  } catch (e) {
    console.error("Error during logout:", e);
    return res
      .status(500)
      .json({ message: "User NOT logged out", error: e.message });
  }
};
