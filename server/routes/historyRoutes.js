const express = require('express');
const router=express.Router();

const {getHistory,getHistoryById,deleteHistory , getDashboardStats}=require('../controllers/historyController');

const protect = require('../middleware/authMiddleware');

router.get("/stats", protect, getDashboardStats);

router.get("/", protect, getHistory);

router.get("/:id", protect, getHistoryById);

router.delete("/:id", protect, deleteHistory);

module.exports= router;