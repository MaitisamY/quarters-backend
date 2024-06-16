import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import userRoutes from "./routes/user.routes.js";
import refferalRoutes from "./routes/refferal.routes.js";
import connectDB from "./config/db.js";
import "./config/db.js";
import "./middleware/auth.middleware.js";

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/new", refferalRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
