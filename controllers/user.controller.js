import UserService from "../services/user.service.js";

export const register = async (req, res) => {
  try {
    const { user, token, verificationCode } = await UserService.register(req.body);
    res.status(201).json({
      token,
      name: user.name,
      uniqueId: user.uniqueId,
      email: user.email,
      role: user.role,
      verificationCode
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { user, token } = await UserService.login(req.body);
    res.status(200).json({
      token,
      name: user.name,
      uniqueId: user.uniqueId,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserService.getUsers();
    res.status(200).json(users); // Ensure the response sends the users array
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
