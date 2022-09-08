const mongoose = require("mongoose");
const connectDb = require("../db/connectDb");
const Template = require("../models/templateModel");

exports.handler = async (event, context) => {
  await connectDb(process.env.REACT_APP_DB);
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const id = event.queryStringParameters.id;
    console.log(id);
    const response = {
      msg: "Templates successfully deleted",
    };

    await Template.deleteOne({ _id: id });
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