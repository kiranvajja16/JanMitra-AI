const History = require("../models/History");


const getHistory = async (req, res) => {
  try {
    console.log("Logged in user:", req.user._id);

    const history = await History.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    console.log("History:", history);

    res.json({
      success: true,
      count: history.length,
      history,
    });
  } catch (err) {
    console.error("GET HISTORY ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  }
};


const getHistoryById = async (req, res) => {
  try {
    const history = await History.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

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
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const deleteHistory = async (req, res) => {
  try {
    const history = await History.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "History not found",
      });
    }

    res.json({
      success: true,
      message: "History deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const history = await History.find({ user: req.user._id });

    const totalChecks = history.length;

    const totalEligible = history.reduce(
      (sum, item) => sum + item.eligibleSchemes.length,
      0
    );

    res.json({
      success: true,
      totalChecks,
      totalEligible,
      totalHistory: history.length,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getHistory,
  getHistoryById,
  deleteHistory,
  getDashboardStats,
};