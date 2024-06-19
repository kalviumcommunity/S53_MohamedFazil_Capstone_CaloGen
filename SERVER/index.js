const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./Config/connectDB");
const cors = require("cors");
const mealRouter = require("./Routers/mealRouters");
const authRouter = require("./Routers/authRouters");

const PORT = process.env.PORT;

app.use(
  cors({
    origin: ["https://calogen-capstone.vercel.app", "http://localhost:5173"],
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type",
    credentials: true,
  })
);
app.use(express.json());
connectDB();
app.use("/meals", mealRouter);
app.use("/auth", authRouter);

const timeout = require("connect-timeout");
app.use(timeout("15s"));

// Your route definitions
app.get("/your-route", async (req, res) => {
  try {
    // Your route logic
  } catch (error) {
    res.status(500).json({ message: "Error occurred", error: error.message });
  }
});

// Error handler for timeout
app.use((req, res, next) => {
  if (!req.timedout) next();
  else res.status(500).json({ message: "Request timeout" });
});

app.get("/", async (req, res) => {
  try {
    // Check if the mongoose connection is ready
    const isConnected = mongoose.connection.readyState === 1;
    if (isConnected) {
      res.send("Database connection status: Connected");
    } else {
      res.send("Database connection status: Disconnected");
    }
  } catch (error) {
    console.error("Error checking database connection:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT: ${PORT}`);
});
