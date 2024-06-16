import express from "express";
import passport from "passport";
import {
  register,
  login,
  getUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get('/all' , getUsers);

export default router;
