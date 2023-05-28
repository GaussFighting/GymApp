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
  const countTrainingsPerYears =
    event.queryStringParameters.countTrainingsPerYears;
  const countWeights = event.queryStringParameters.countWeights;
  const countDays = event.queryStringParameters.countDays;

  let arrayOfTraining = async () => {
    let currentYear = new Date().getFullYear();
    let arrayOfTotalTrainings = [];
    for (let i = currentYear; i > 2015; i--) {
      let isoCurrentYear = new Date(i.toString()).toISOString();
      const aYearAgoFromNow = new Date();
      let isoEndOfYear = new Date((i + 1).toString()).toISOString();

      arrayOfTotalTrainings = [
        ...arrayOfTotalTrainings,
        await Result.find({
          date: {
            $gte: isoCurrentYear,
            $lte: isoEndOfYear,
          },
        }).count(),
      ];
    }
    return arrayOfTotalTrainings;
  };

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
      res = {
        results: await Result.find({
          date: { $gte: isoStartDate, $lte: isoEndDate },
        }).sort({ date: -1 }),
      };
    } else if (countTrainings) {
      res = { results: [], count: await Result.find({}).count() };
    } else if (countTrainingsPerYears) {
      res = {
        results: [],
        count: await arrayOfTraining(),
      };
    } else if (countWeights) {
      res = {
        results: await Result.find({}, { bodyWeight: 1, date: 1 }).sort({
          date: -1,
        }),
      };
    } else if (countDays) {
      let isoCurrenttDate = new Date().toISOString();
      let isoYearAgoDate = new Date(
        new Date().setFullYear(new Date().getFullYear() - 1)
      ).toISOString();
      res = {
        results: await Result.find(
          {
            date: { $gte: isoYearAgoDate, $lte: isoCurrenttDate },
          },
          { date: 1, templateExercises: 1 }
        ).sort({
          date: 1,
        }),
      };
    } else {
      res = { results: await Result.find({}).sort({ date: -1 }) };
    }

    const response = {
      msg: "Results successfully found",
      data: {
        res,
      },
    };
    console.log("response", response);
    // mongoose.connection.close(); was it necessery? MongoNotConnectedError: Client must be connected before running operations
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
