const connectDb = require("../db/connectDb");
const Result = require("../models/resultModel");
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
    if (roleOfverifiedUser === "User") {
      const data = JSON.parse(event.body);
      const result = {
        _id: mongoose.Types.ObjectId(),
        templateName: data.filteredResultsWithExistingExercises.templateName,
        description:
          "Added by User" +
          data.filteredResultsWithExistingExercises.description,
        bodyWeight: data.filteredResultsWithExistingExercises.bodyWeight,
        date: data.filteredResultsWithExistingExercises.date,
        templateExercises:
          data.filteredResultsWithExistingExercises.templateExercises,
      };
      const response = {
        msg: "Results successfully created",
        data: result,
      };

      await Result.create(result);
      mongoose.connection.close();
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    }
    if (roleOfverifiedUser === "Admin") {
      const data = JSON.parse(event.body);
      const result = {
        _id: mongoose.Types.ObjectId(),
        templateName: data.filteredResultsWithExistingExercises.templateName,
        description: data.filteredResultsWithExistingExercises.description,
        bodyWeight: data.filteredResultsWithExistingExercises.bodyWeight,
        date: data.filteredResultsWithExistingExercises.date,
        templateExercises:
          data.filteredResultsWithExistingExercises.templateExercises,
      };
      const response = {
        msg: "Results successfully created",
        data: result,
      };

      await Result.create(result);
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
