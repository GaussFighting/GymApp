const connectDb = require("../db/connectDb");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.handler = async (event, context) => {
  const mongoose = await connectDb(process.env.REACT_APP_DB);

  const jwtSecret = process.env.JWT_SECRET;

  context.callbackWaitsForEmptyEventLoop = false;

  const data = JSON.parse(event.body);
  console.log("data", event.body);
  const token = data.token;
  try {
    const user = jwt.verify(token, jwtSecret, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    if (user == "token expired") {
      return { statusCode: 500, body: JSON.stringify("token expired") };
    }

    const useremail = user.email;
    const userData = await User.findOne({ email: useremail }).then((data) => {
      return data;
    });
    console.log("userData", userData);
    return { statusCode: 200, body: JSON.stringify(userData) };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
