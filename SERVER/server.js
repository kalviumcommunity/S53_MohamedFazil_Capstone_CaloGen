const express = require("express");
const mealRouter = require("./Routers/mealRouters");
const app = express();
const dotenv = require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json());
app.use("/meals", mealRouter);

app.get("/", (req, res) => {
  res.send(`Server is running`);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT: ${PORT}`);
});
