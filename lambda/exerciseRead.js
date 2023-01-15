const connectDb = require("../db/connectDb");
const Exercise = require("../models/exerciseModel");

exports.handler = async (event, context) => {
  const mongoose = await connectDb(process.env.REACT_APP_DB);

  console.log(mongoose.connection.readyState, "ready state exercise");
  console.log("EVENT", event);
  console.log("CONTEXT", context);
  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.queryStringParameters.id;
  try {
    const exercises = id
      ? await Exercise.find({ _id: id })
      : await Exercise.find({});

    const response = {
      msg: "Exercises successfully found",
      data: {
        exercises,
      },
    };
    mongoose.connection.close();
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
