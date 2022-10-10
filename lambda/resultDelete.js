const mongoose = require("mongoose");
const connectDb = require("../db/connectDb");
const Result = require("../models/resultModel");

exports.handler = async (event, context) => {
  await connectDb(process.env.REACT_APP_DB);
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const id = event.queryStringParameters.id;
    console.log(id);
    const response = {
      msg: "Result successfully deleted",
    };

    await Result.deleteOne({ _id: id });
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
