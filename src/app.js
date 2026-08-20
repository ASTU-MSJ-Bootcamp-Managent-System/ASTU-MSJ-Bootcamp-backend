const express = require("express");

// Only import routes that actually exist and export a router
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const attendanceRoutes = require("./routes/attendance.routes");

const app = express();

// Parse incoming JSON body
app.use(express.json());

// Mount only completed routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR CATCH:", err);
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;