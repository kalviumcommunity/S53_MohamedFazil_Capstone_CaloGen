const userModel = require("../Models/userModel");
const { userValidator } = require("../Validators/userValidator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signIn = async (req, res) => {
  try {
    const { name, user_name, password, religion } = req.body;
    const existingUser = await userModel.findOne({ user_name: user_name });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { error, value } = userValidator({
      name,
      user_name,
      password: hashedPassword,
      religion,
    });
    if (error) {
      return res.status(400).json({ details: error.details });
    }
    const newUser = await userModel.create(value);
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
    res.status(201).json({
      user_name: newUser.user_name,
      token,
      userID: newUser._id,
      religion: newUser.religion,
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

const logIn = async (req, res) => {
  try {
    const { user_name, password } = req.body;

    const user = await userModel.findOne({ user_name: user_name });

    const { error } = userValidator({
      name: user.name,
      user_name,
      password,
      religion: user.religion,
    });

    if (error) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: error.details });
    }

    if (!user) {
      return res.json({ message: "User doesn't exist!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ message: "Username or Password is incorrect!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    
    res.status(200).json({
      user_name,
      token,
      userID: user._id,
      religion: user.religion,
      isPasswordValid,
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports = { signIn, logIn };
