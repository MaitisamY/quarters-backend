import UserService from "../services/user.service.js";

export const register = async (req, res) => {
  try {
    const { user, token } = await UserService.register(req.body);
    res.status(201).json({
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

export const getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
};
