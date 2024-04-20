const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const cors = require("cors");
const mealRouter = require("./Routers/mealRouters");

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
connectDB()
app.use("/meals", mealRouter);

app.get("/", (req, res) => {
  res.send(`Server is running`);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT: ${PORT}`);
});
