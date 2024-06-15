import express from "express";
import passport from "passport";
import {
  register,
  login,
  getUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  getUserProfile
);

export default router;
