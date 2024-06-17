import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import userRoutes from "./routes/user.routes.js";
import refferalRoutes from "./routes/refferal.routes.js";
import "./config/db.js";
import "./middleware/auth.middleware.js";
import { MongoClient, ServerApiVersion } from 'mongodb';
// import dotenv from 'dotenv';

// dotenv.config();
const app = express();
// const uri = process.env.MONGO_URI;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//     serverSelectionTimeoutMS: 5000
//   },
//   tls: true,
//   tlsAllowInvalidCertificates: false,
//   tlsAllowInvalidHostnames: false,
// });

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("quarters_db").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// run().catch(console.dir);

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
