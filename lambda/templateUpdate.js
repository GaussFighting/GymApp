const mongoose = require("mongoose");
const connectDb = require("../db/connectDb");
const Template = require("../models/templateModel");

exports.handler = async (event, context) => {
  await connectDb(process.env.REACT_APP_DB);
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const id = event.queryStringParameters.id;
    const data = JSON.parse(event.body);
    const response = {
      msg: "Templates successfully found",
      data: {
        ...data,
      },
    };

    await Template.findOneAndUpdate({ _id: id }, data);
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
