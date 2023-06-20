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
  const role = user.role;

  const expiresIn = 6000;
  const date = new Date();
  const expireTime = new Date(date.getTime() + expiresIn * 1000).toUTCString();

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
      const token = jwt.sign({ email: user.email }, jwtSecret, {
        expiresIn: expiresIn,
      });

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "front-end domain",
          "Content-Type": "application/json",
          "Set-Cookie":
            "token=" +
            token +
            ";path=/; HttpOnly=true; SameSite=Strict; secure; expires=" +
            expireTime +
            ";",
        },
        body: JSON.stringify({ token, role }),
      };
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
