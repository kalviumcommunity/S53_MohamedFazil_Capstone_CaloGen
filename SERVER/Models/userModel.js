const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  user_name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  religion: { type: String, required: true },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
