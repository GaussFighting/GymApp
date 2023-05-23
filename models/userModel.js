const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: {
    type: String,
    required: [true, "Firstname field is required"],
    max: 200,
  },
  lastname: {
    type: String,
    required: [true, "Lastname field is required"],
    max: 200,
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
    max: 200,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email field is required"],
    max: 200,
  },
  userType: {
    type: String,
    required: [true, "Email field is required"],
    max: 200,
  },
});

module.exports = mongoose.model("Users", userSchema);
