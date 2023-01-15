const mongoose = require("mongoose");
const connectDb = require("../db/connectDb");
const Result = require("../models/resultModel");

exports.handler = async (event, context) => {
  await connectDb(process.env.REACT_APP_DB);
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const id = event.queryStringParameters.id;
    const data = JSON.parse(event.body);
    const response = {
      msg: "Results successfully found",
      data: {
        ...data,
      },
    };

    const found = await Result.findOneAndUpdate({ _id: id }, data);
    mongoose.connection.close();
    return {
      statusCode: 200,
      body: JSON.stringify({ ...response, found }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
