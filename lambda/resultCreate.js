const connectDb = require("../db/connectDb");
const Result = require("../models/resultModel");

exports.handler = async (event, context) => {
  const mongoose = await connectDb(process.env.REACT_APP_DB);
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const data = JSON.parse(event.body);
    const result = {
      _id: mongoose.Types.ObjectId(),
      templateName: data.templateName,
      description: data.description,
      bodyWeight: data.bodyWeight,
      date: data.date,
      templateExercises: data.templateExercises,
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
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
