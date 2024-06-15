import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import userRoutes from "./routes/user.routes.js";
import "./config/db.js";
import "./middleware/auth.middleware.js";

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

// Routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
