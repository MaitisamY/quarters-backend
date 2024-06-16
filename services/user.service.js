import User from "../models/user.model.js";
import { generateToken } from "../utils/jwt.utils.js";
import { sendWelcomeEmail } from "../utils/mailer.js";
import { generateVerificationCode } from "../utils/codeGenerator.js"; // New import

const UserService = {
  register: async (userData) => {
    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email: userData.email }).maxTimeMS(10000); // Set a max time for the query
      if (existingUser) {
        throw new Error("Email already in use");
      }

      const lastUser = await User.findOne().sort({ uniqueId: -1 }).maxTimeMS(10000); // Set a max time for the query
      const uniqueId = lastUser
        ? (parseInt(lastUser.uniqueId) + 1).toString().padStart(4, "0")
        : "1001";

      const verificationCode = generateVerificationCode(); // Generate 4-digit code

      console.log(verificationCode);

      const user = new User({ ...userData, uniqueId });
      await user.save();
      const token = generateToken(user);

      sendWelcomeEmail(user.name, user.email, user.role, verificationCode); // Send role-based email with code

      return { user, token, verificationCode }; 
    } catch (error) {
      console.error("Error during registration:", error);
      throw new Error("Registration failed");
    }
  },

  login: async (userData) => {
    try {
      const user = await User.findOne({ email: userData.email }).maxTimeMS(10000); // Set a max time for the query
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
      const users = await User.find(
        { role: { $ne: 'admin' } }, 
        { password: 0 } // Projection to exclude the password field
      ).maxTimeMS(10000); // Set a max time for the query

      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  },
};

export default UserService;
