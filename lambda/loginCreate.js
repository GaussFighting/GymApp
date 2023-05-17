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
  const password = data.password;
  const email = data.email;
  const user = await User.findOne({
    email,
  });
  console.log("paswword", password, "email", email, "user", user);

  try {
    if (!user) {
      console.log("This User doesn't exist in database!");
      return {
        statusCode: 409,
        body: JSON.stringify({
          msg: "This User doesn't exist in database!",
        }),
      };
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, jwtSecret);
      console.log("token", token);
      return { statusCode: 200, body: JSON.stringify(token) };
    }
    return {
      statusCode: 403,
      body: JSON.stringify({
        msg: "Invalid Password",
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
