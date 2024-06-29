import express from "express";
import passport from "passport";
import {
    register,
    login,
    getUsers,
    welcome,
} from "../controllers/user.controller.js";

const router = express.Router();

/* User routes */
router.post("/register", register);
router.post("/welcome", welcome);
router.post("/login", login);
router.get('/all' , getUsers);

export default router;
