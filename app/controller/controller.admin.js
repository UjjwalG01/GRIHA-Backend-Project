const bcrypt = require("bcrypt");
const User = require("../model/model.user");

exports.index = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.store = async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      role: "admin",
    });
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getAdmin = async (req, res) => {
  try {
    const admin = await User.find({ role: "admin" });
    res.status(200).json({
      status: "success",
      data: admin,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.find({ role: "user" });
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};
