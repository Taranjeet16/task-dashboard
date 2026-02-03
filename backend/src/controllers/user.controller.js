import User from "../models/User.js";

export const getMe = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
};

export const updateMe = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.userId, req.body, { new: true }).select("-password");
  res.json(user);
};