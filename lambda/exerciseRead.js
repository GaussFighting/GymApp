const mongoose = require("mongoose");
// const connectDb = require("../db/connectDb");
const Exercise = require("../models/exerciseModel");

exports.handler = async (event, context) => {
  // const id = event.queryStringParameters.id;
  try {
    const dbconn = await mongoose.connect(process.env.REACT_APP_DB);
    console.log(dbconn);
    //Make connection with mongoose to mongo atlas outside handler
    console.log(mongoose.connection.readyState, "ready state exercise");
    console.log("EVENT", event);
    console.log("CONTEXT", context);
    context.callbackWaitsForEmptyEventLoop = false;
    // const exercises = id;
    // ? await Exercise.find({ _id: id })
    console.log(Exercise);
    console.log("przedawaitem");
    const exercises = await Exercise.find();
    console.log("AAA", id, exercises);
    const response = {
      msg: "Exercises successfully found",
      data: {
        exercises,
      },
    };
    mongoose.disconnect();
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
