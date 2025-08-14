import { Router } from "express";
import { getProfile, LogIn, LogOut, SignUp } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", SignUp);
authRouter.post("/login", LogIn);
authRouter.post("/logout", LogOut);
authRouter.get("/profile",protectRoute, getProfile)

export default authRouter;
