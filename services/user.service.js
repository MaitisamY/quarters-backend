import mongoose from "mongoose";
import User from "../models/user.model.js";
import Referral from "../models/referral.model.js";
import { generateToken } from "../utils/jwt.utils.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../utils/mailer.js";
import { generateVerificationCode } from "../utils/codeGenerator.js"; 

/* User service methods */
const UserService = {
    // Register user
    register: async (userData) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            // console.log('Registering user with data:', userData); <--- Uncomment to debug

            // Run independent queries in parallel
            const [existingUser, lastUser, referral] = await Promise.all([
                User.findOne({ email: userData.email }).session(session).maxTimeMS(30000),
                User.findOne().sort({ uniqueId: -1 }).session(session).maxTimeMS(30000),
                userData.referral_code ? Referral.findOne({ referral_code: userData.referral_code }).session(session).maxTimeMS(30000) : Promise.resolve(null)
            ]);

            if (existingUser) {
                throw new Error("Email already in use");
            }

            const uniqueId = lastUser
                ? (parseInt(lastUser.uniqueId) + 1).toString().padStart(4, "0")
                : "1001";

            let referrer;
            if (referral) {
                referrer = await User.findOne({ email: referral.referrer_email }).session(session).maxTimeMS(30000);
            }

            const verificationCode = generateVerificationCode();
            // console.log('Generated verification code:', verificationCode); <--- Uncomment to debug

            const user = new User({ ...userData, uniqueId });
            await user.save({ session });

            if (referrer) {
                referrer.referrals += 1;
                await referrer.save({ session });
            }

            await session.commitTransaction();
            session.endSession();

            const token = generateToken(user);
            sendVerificationEmail(user.name, user.email, verificationCode);

            return { user, token, verificationCode };
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error during registration:", error);
            if (error.code === 11000) {
                throw new Error("Duplicate key error: " + JSON.stringify(error.keyValue));
            }
            throw new Error(error.message || "Registration failed");
        }
    },

    // Send welcome email
    sendWelcomeEmail: async (email) => {
        try {
            const user = await User.findOne({ email }).maxTimeMS(30000);
            if (!user) {
                throw new Error("User not found");
            }
            sendWelcomeEmail(user.name, user.email, user.role);
        } catch (error) {
            console.error("Error sending welcome email:", error);
            throw new Error(error.message || "Failed to send welcome email");
        }
    },

    // Login user
    login: async (userData) => {
        try {
            // console.log('Logging in user with data:', userData); <--- Uncomment to debug

            const user = await User.findOne({ email: userData.email }).maxTimeMS(30000);
            if (!user || !(await user.comparePassword(userData.password))) {
                throw new Error("Invalid credentials");
            }
            const token = generateToken(user);
            return { user, token };
        } catch (error) {
            console.error("Error during login:", error);
            throw new Error(error.message || "Login failed");
        }
    },

    // Get all users
    getUsers: async () => {
        try {
            console.log('Fetching users');

            const users = await User.find(
                { role: { $ne: 'admin' } },
                { password: 0 }
            ).maxTimeMS(30000);

            return users;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw new Error(error.message || "Failed to fetch users");
        }
    },
};

export default UserService;
