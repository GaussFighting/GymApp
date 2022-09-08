const mongoose = require("mongoose");
const connectDb = require("../db/connectDb");
const Template = require("../models/templateModel");

exports.handler = async (event, context) => {
  await connectDb(process.env.REACT_APP_DB);
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const data = JSON.parse(event.body);
    const template = {
      _id: mongoose.Types.ObjectId(),
      templateName: data.templateName,
      description: data.description,
      templateExercises: data.templateExercises,
    };
    const response = {
      msg: "Templates successfully created",
      data: template,
    };

    await Template.create(template);
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
