const connectDb = require("../db/connectDb");
const Template = require("../models/templateModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.handler = async (event, context) => {
  const mongoose = await connectDb(process.env.REACT_APP_DB);
  context.callbackWaitsForEmptyEventLoop = false;
  const jwtSecret = process.env.JWT_SECRET;
  const id = event.queryStringParameters.id;
  const data = JSON.parse(event.body);
  const verifiedToken = jwt.verify(data.token, jwtSecret);

  try {
    const verifiedEmail = verifiedToken.email;
    const verifiedUser = await User.findOne({ email: verifiedEmail });
    const roleOfverifiedUser = verifiedUser.role;
    if (roleOfverifiedUser === "Admin") {
      const id = event.queryStringParameters.id;
      const data = JSON.parse(event.body);
      const response = {
        msg: "Templates successfully found",
        data: {
          ...data.editedTemplate,
        },
      };

      await Template.findOneAndUpdate({ _id: id }, data.editedTemplate);
      mongoose.connection.close();
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    } else {
      return {
        statusCode: 403,
        body: JSON.stringify({
          msg: "Access denied",
        }),
      };
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
