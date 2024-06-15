import User from "../models/user.model.js";
import { generateToken } from "../utils/jwt.utils.js";
import { sendWelcomeEmail } from "../utils/mailer.js";
import { generateVerificationCode } from "../utils/codeGenerator.js"; // New import

const UserService = {
  register: async (userData) => {
    const lastUser = await User.findOne().sort({ uniqueId: -1 });
    const uniqueId = lastUser
      ? (parseInt(lastUser.uniqueId) + 1).toString().padStart(4, "0")
      : "1001";

    const verificationCode = generateVerificationCode(); // Generate 4-digit code

    const user = new User({ ...userData, uniqueId });
    await user.save();
    const token = generateToken(user);

    sendWelcomeEmail(user.name, user.email, user.role, verificationCode); // Send role-based email with code

    return { user, token, verificationCode }; // Return the code for frontend verification
  },

  login: async (userData) => {
    const user = await User.findOne({ email: userData.email });
    if (!user || !(await user.comparePassword(userData.password))) {
      throw new Error("Invalid credentials");
    }
    const token = generateToken(user);
    return { user, token };
  },
};

export default UserService;
