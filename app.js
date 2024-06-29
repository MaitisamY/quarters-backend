import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import userRoutes from "./routes/user.routes.js";
import refferalRoutes from "./routes/refferal.routes.js";
import { fileURLToPath } from "url";
import path from "path";
import "./config/db.js";
import "./middleware/auth.middleware.js";

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

// Static files
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/new", refferalRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
