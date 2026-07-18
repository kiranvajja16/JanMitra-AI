const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getDashboard,
  getUsers,
  deleteUser,
  getAllHistory,
  getReports,
  getSchemes,
  addScheme,
  updateScheme,
  deleteScheme,
  getSchemeById,
  getHistoryById,
} = require("../controllers/adminController");

router.get(
  "/dashboard",
  protect,
  adminOnly,
  getDashboard
);

router.get(
  "/users",
  protect,
  adminOnly,
  getUsers
);

router.delete(
  "/users/:id",
  protect,
  adminOnly,
  deleteUser
);

router.get(
  "/history",
  protect,
  adminOnly,
  getAllHistory
);

router.get(
  "/reports",
  protect,
  adminOnly,
  getReports
);

router.get(
  "/schemes",
  protect,
  adminOnly,
  getSchemes
);

router.post(
  "/schemes",
  protect,
  adminOnly,
  addScheme
);

router.put(
  "/schemes/:id",
  protect,
  adminOnly,
  updateScheme
);

router.delete(
  "/schemes/:id",
  protect,
  adminOnly,
  deleteScheme
);

router.get(
  "/schemes/:id",
  protect,
  adminOnly,
  getSchemeById
);

router.get(
  "/history/:id",
  protect,
  adminOnly,
  getHistoryById
);




module.exports = router;