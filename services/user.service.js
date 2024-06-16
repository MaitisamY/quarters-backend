import User from "../models/user.model.js";
import { generateToken } from "../utils/jwt.utils.js";
import { sendWelcomeEmail } from "../utils/mailer.js";
import { generateVerificationCode } from "../utils/codeGenerator.js"; // New import

const UserService = {
  register: async (userData) => {

    // Check if email already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const lastUser = await User.findOne().sort({ uniqueId: -1 });
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
  },

  login: async (userData) => {
    const user = await User.findOne({ email: userData.email });
    if (!user || !(await user.comparePassword(userData.password))) {
      throw new Error("Invalid credentials");
    }
    const token = generateToken(user);
    return { user, token };
  },

  getUsers: async () => {
    const users = await User.find(
      { role: { $ne: 'admin' } }, 
      { password: 0 } // Projection to exclude the password field
    );

    return users;
  },
};

export default UserService;
