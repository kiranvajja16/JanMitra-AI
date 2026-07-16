const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const schemeRoutes=require('./routes/schemeRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/schemes',schemeRoutes);

// Root Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to JanMitra AI API ",
    });
});

module.exports = app;