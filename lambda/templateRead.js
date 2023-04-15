const connectDb = require("../db/connectDb");
const Template = require("../models/templateModel");

exports.handler = async (event, context) => {
  const mongoose = await connectDb(process.env.REACT_APP_DB);

  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.queryStringParameters.id;
  try {
    const templates = id
      ? await Template.find({ _id: id })
      : await Template.find({});

    const response = {
      msg: "Templates successfully found",
      data: {
        templates,
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
