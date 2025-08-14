import { ACCESS_TOKEN, NODE_ENV, REFRESH_TOKEN } from "../../env.js";
import redis from "../lib/redis.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

async function generateTokens(userId) {
  const refreshToken = await jwt.sign({ userId }, REFRESH_TOKEN, {
    expiresIn: "15m",
  });
  const accessToken = await jwt.sign({ userId }, ACCESS_TOKEN, {
    expiresIn: "7d",
  });
  return { refreshToken, accessToken };
}
const storeToken = async (userId, refreshToken) => {
  redis.set(`refreshToken:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60);
};
const setCookie = async (res, refreshToken, accessToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user is registered",
      });
    }
    const user = await User.create({ name, email, password });

    const { refreshToken, accessToken } = await generateTokens(user._id);
    await storeToken(user._id, refreshToken);
    await setCookie(res,refreshToken, accessToken);

    if (user) {
      res.status(201).json({
        success: true,
        message: "user created successfully",
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: "User creation failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error",
      error: error.message,
    });
  }
};

export const LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "the email is not registered",
      });
    }
    if (user && await user.comparePassword(password)) {
      const { refreshToken, accessToken } = await generateTokens(user._id);
      await storeToken(user._id, refreshToken);
      await setCookie(res,refreshToken, accessToken);
      console.log(accessToken);
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Email or Password are invalid!",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const LogOut = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if(refreshToken){
        const decoded = jwt.verify(refreshToken, REFRESH_TOKEN);
        redis.del(`refreshToken:${decoded.userId}`)
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
