const connectDb = require("../db/connectDb");
const Result = require("../models/resultModel");

exports.handler = async (event, context) => {
  const mongoose = await connectDb(process.env.REACT_APP_DB);

  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.queryStringParameters.id;
  const exerciseId = event.queryStringParameters.exerciseId;
  const startDate =
    event.queryStringParameters.startDate &&
    new Date(event.queryStringParameters.startDate);
  const endDate =
    event.queryStringParameters.endDate &&
    new Date(event.queryStringParameters.endDate);
  const isoStartDate = startDate && startDate.toISOString();
  const isoEndDate = endDate && endDate.toISOString();

  try {
    let results = {};
    if (id) {
      results = await Result.find({ _id: id }).sort({ date: -1 });
    } else if (exerciseId) {
      results = await Result.find({
        templateExercises: { $elemMatch: { id: exerciseId } },
      }).sort({ date: -1 });
    } else if (isoStartDate && isoEndDate) {
      results = await Result.find({
        date: { $gte: isoStartDate, $lte: isoEndDate },
      }).sort({ date: -1 });
    } else {
      results = await Result.find({}).sort({ date: -1 });
    }
    const response = {
      msg: "Results successfully found",
      data: {
        results,
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
