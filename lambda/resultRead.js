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
  const countTrainings = event.queryStringParameters.countTrainings;
  const countTrainings2023 = event.queryStringParameters.countTrainings2023;

  console.log("2023", event);

  console.log("numberOfTrainings", event.queryStringParameters);
  try {
    let res = {};
    if (id) {
      res = { results: await Result.find({ _id: id }).sort({ date: -1 }) };
    } else if (exerciseId) {
      res = {
        results: await Result.find({
          templateExercises: { $elemMatch: { id: exerciseId } },
        }).sort({ date: -1 }),
      };
    } else if (isoStartDate && isoEndDate) {
      console.log("Data", isoStartDate, typeof isoStartDate);
      res = {
        results: await Result.find({
          date: { $gte: isoStartDate, $lte: isoEndDate },
        }).sort({ date: -1 }),
      };
    } else if (countTrainings) {
      res = { results: [], count: await Result.find({}).count() };
    } else if (countTrainings2023) {
      res = {
        results: [],
        count: await Result.find({
          date: {
            $gte: "2023-01-01T00:00:00.000Z",
            $lte: "2024-01-01T00:00:00.000Z",
          },
        }).count(),
      };
    } else {
      res = { results: await Result.find({}).sort({ date: -1 }) };
    }
    console.log("startDate", startDate, typeof startDate);
    console.log("isoStartDate", isoStartDate, typeof isoStartDate);
    console.log("2023-01-01T00:00:00.000Z");

    const response = {
      msg: "Results successfully found",
      data: {
        res,
      },
    };
    console.log("response", response);
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
