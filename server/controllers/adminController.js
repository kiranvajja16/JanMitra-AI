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


    const histories = await History.find();

    const totalEligible = histories.reduce(
      (sum, item) => sum + (item.eligibleSchemes?.length || 0),
      0
    );

    const averageEligible =
      totalHistory > 0
        ? (totalEligible / totalHistory).toFixed(1)
        : 0;

    const schemes = await Scheme.find();

    const categoryMap = {};

    schemes.forEach((scheme) => {
      categoryMap[scheme.category] =
        (categoryMap[scheme.category] || 0) + 1;
    });

    const categoryData = Object.keys(categoryMap).map((key) => ({
      name: key,
      value: categoryMap[key],
    }));


    const stateMap = {};

    histories.forEach((history) => {
      const state = history.citizenProfile?.state || "Unknown";

      stateMap[state] = (stateMap[state] || 0) + 1;
    });

    const stateData = Object.keys(stateMap).map((key) => ({
      state: key,
      users: stateMap[key],
    }));

  
    const schemeMap = {};

    histories.forEach((history) => {
      history.eligibleSchemes?.forEach((scheme) => {
        const name = scheme.schemeName;

        schemeMap[name] = (schemeMap[name] || 0) + 1;
      });
    });

    const topSchemes = Object.entries(schemeMap)
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);


    const recentHistory = await History.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(8);

    res.json({
      success: true,

      stats: {
        totalUsers,
        totalSchemes,
        totalHistory,
        averageEligible,
      },

      categoryData,

      stateData,

      topSchemes,

      recentHistory,
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

const getHistoryById = async (req, res) => {
  try {
    const history = await History.findById(req.params.id)
      .populate("user", "name email");

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "History not found",
      });
    }

    res.json({
      success: true,
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

module.exports = {
  getDashboard,
  getUsers,
  deleteUser,
  getAllHistory,
  getReports,
  getHistoryById,

  getSchemes,
  getSchemeById,
  addScheme,
  updateScheme,
  deleteScheme,
};