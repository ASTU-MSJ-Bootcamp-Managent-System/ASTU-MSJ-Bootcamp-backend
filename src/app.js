require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});