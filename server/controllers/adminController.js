const User = require("../models/User");
const Scheme = require("../models/Scheme");
const History = require("../models/History");

const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSchemes = await Scheme.countDocuments();
    const totalHistory = await History.countDocuments();

    const recentUsers = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      totalUsers,
      totalSchemes,
      totalHistory,
      recentUsers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(400).json({
        success: false,
        message: "Admin cannot be deleted",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAllHistory = async (req, res) => {
  try {
    const history = await History.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: history.length,
      history,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const getReports = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSchemes = await Scheme.countDocuments();
    const totalHistory = await History.countDocuments();

    const history = await History.find();

    let totalEligible = 0;

    history.forEach(item => {
      totalEligible += item.eligibleSchemes.length;
    });

    const averageEligible =
      history.length === 0
        ? 0
        : (totalEligible / history.length).toFixed(1);

    res.json({
      success: true,
      totalUsers,
      totalSchemes,
      totalHistory,
      averageEligible,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: schemes.length,
      schemes,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const addScheme = async (req, res) => {
  try {
    const scheme = await Scheme.create(req.body);

    res.status(201).json({
      success: true,
      message: "Scheme added successfully",
      scheme,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to add scheme",
    });
  }
};

const updateScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found",
      });
    }

    res.json({
      success: true,
      message: "Scheme updated successfully",
      scheme,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found",
      });
    }

    await Scheme.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Scheme deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getSchemeById = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found",
      });
    }

    res.json({
      success: true,
      scheme,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getDashboard,
  getUsers,
  deleteUser,
  getAllHistory,
  getReports,

  getSchemes,
  getSchemeById,
  addScheme,
  updateScheme,
  deleteScheme,
};