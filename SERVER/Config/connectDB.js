const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL_, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log("Connection with DB established 📦✅");
  } catch (err) {
    console.log("err: ", err);
  }
};

module.exports = connectDB;
