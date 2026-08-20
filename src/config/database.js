const mongoose = require("mongoose");
const env = require("./env"); // Import your loaded env object

const connectDB = async () => {
  try {
    const dbUri = env.mongoUri || process.env.MONGO_URI;

    if (!dbUri) {
      throw new Error(
        "MONGO_URI is missing in environment variables. Check your .env file."
      );
    }

    const conn = await mongoose.connect(dbUri);
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;