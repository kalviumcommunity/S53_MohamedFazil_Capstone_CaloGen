const express = require("express");
const { signIn, logIn } = require("../Controllers/authControllers");
const authRouter = express.Router();

authRouter.post("/signin", signIn);
authRouter.post("/login", logIn);

module.exports = authRouter;
