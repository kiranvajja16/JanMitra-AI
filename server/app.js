const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const schemeRoutes=require('./routes/schemeRoutes');
const historyRoutes=require('./routes/historyRoutes');

const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use('/api/schemes',schemeRoutes);
app.use('/api/history',historyRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to JanMitra AI API ",
    });
});

module.exports = app;