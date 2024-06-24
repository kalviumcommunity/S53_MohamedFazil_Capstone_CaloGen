const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./Config/connectDB");
const mealRouter = require("./Routers/mealRouters");
const authRouter = require("./Routers/authRouters");
const timeout = require("connect-timeout");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: ["https://calogen-capstone.vercel.app", "http://localhost:5173"],
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type",
  credentials: true,
}));

app.use(express.json());
app.use(timeout("15s"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/meals", mealRouter);
app.use("/auth", authRouter);

app.get("/", async (req, res) => {
  try {
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

app.use((req, res, next) => {
  if (!req.timedout) next();
  else res.status(500).json({ message: "Request timeout" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT: ${PORT}`);
});
