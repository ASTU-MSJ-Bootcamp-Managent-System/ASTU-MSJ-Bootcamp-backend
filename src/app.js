const express = require("express");
const connectDB = require("./config/database");
const attendanceRoutes = require("./routes/attendance.routes");

const app = express();

app.use(express.json());

app.use("/api/attendance", attendanceRoutes);

connectDB();

module.exports = app;