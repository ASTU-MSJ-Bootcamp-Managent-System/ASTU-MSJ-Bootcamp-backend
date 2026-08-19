require("dotenv").config();

const env = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI,
};

module.exports = env;