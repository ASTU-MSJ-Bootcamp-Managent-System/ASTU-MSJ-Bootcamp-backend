const app = require("./app");
const env = require("./config/env");
const connectDB = require("./config/database");

// Connect to MongoDB first, then start listening
connectDB()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server due to DB connection error:", err.message);
  });