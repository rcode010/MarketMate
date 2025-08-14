import jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../../env.js";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No access token provided" });
    }
    const decoded = jwt.verify(accessToken, ACCESS_TOKEN);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.json({
        success: false,
        message: "user not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
export const sellerRoute = async (req, res, next) => {
  const user = req.user;
  if (user.role === "seller") {
    next();
  } else {
    return res.json({
      success: false,
      message: "sellers only",
    });
  }
};
export const buyerRoute = async (req, res, next) => {
  const user = req.user;
  if (user.role === "buyer") {
    next();
  } else {
    return res.json({
      success: false,
      message: "buyer only",
    });
  }
};
export const adminRoute = async (req, res, next) => {
  const user = req.user;
  if (user.role === "admin") {
    next();
  } else {
    return res.json({
      success: false,
      message: "admin only",
    });
  }
};
