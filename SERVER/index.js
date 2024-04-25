const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./Config/connectDB");
const cors = require("cors");
const mealRouter = require("./Routers/mealRouters");

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
