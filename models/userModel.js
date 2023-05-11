const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: [true, "Username field is required"],
    max: 200,
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
    max: 200,
  },
  email: {
    type: String,
    required: [true, "Email field is required"],
    max: 200,
  },
});

module.exports = mongoose.model("Users", userSchema);
