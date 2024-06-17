import User from "../models/user.model.js";
import { generateToken } from "../utils/jwt.utils.js";
import { sendWelcomeEmail } from "../utils/mailer.js";
import { generateVerificationCode } from "../utils/codeGenerator.js"; // New import

const UserService = {
  register: async (userData) => {
    try {
      console.log('Registering user with data:', userData);

      const existingUser = await User.findOne({ email: userData.email }).maxTimeMS(30000); // Increased timeout
      if (existingUser) {
        throw new Error("Email already in use");
      }

      const lastUser = await User.findOne().sort({ uniqueId: -1 }).maxTimeMS(30000); // Increased timeout
      console.log('Last user found:', lastUser);
      const uniqueId = lastUser
        ? (parseInt(lastUser.uniqueId) + 1).toString().padStart(4, "0")
        : "1001";

      const verificationCode = generateVerificationCode();
      console.log('Generated verification code:', verificationCode);

      const user = new User({ ...userData, uniqueId });
      await user.save();
      const token = generateToken(user);

      sendWelcomeEmail(user.name, user.email, user.role, verificationCode);

      return { user, token, verificationCode };
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.code === 11000) {
        throw new Error("Duplicate key error: " + JSON.stringify(error.keyValue));
      }
      throw new Error("Registration failed");
    }
  },

  login: async (userData) => {
    try {
      console.log('Logging in user with data:', userData);

      const user = await User.findOne({ email: userData.email }).maxTimeMS(30000); // Increased timeout
      if (!user || !(await user.comparePassword(userData.password))) {
        throw new Error("Invalid credentials");
      }
      const token = generateToken(user);
      return { user, token };
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("Login failed");
    }
  },

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
      throw new Error("Failed to fetch users");
    }
  },
};

export default UserService;
