const mongoose = require("mongoose");
const connectDb = require("../db/connectDb");
const Exercise = require("../models/exerciseModel");

connectDb(process.env.REACT_APP_DB);
//Make connection with mongoose to mongo atlas outside handler

exports.handler = async (event, context) => {
  console.log(mongoose.connection.readyState, "ready state exercise");
  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.queryStringParameters.id;
  try {
    // const exercises = id;
    // ? await Exercise.find({ _id: id })
    const exercises = await Exercise.find({});
    console.log("AAA", id, exercises);
    const response = {
      msg: "Exercises successfully found",
      data: {
        exercises,
      },
    };
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
