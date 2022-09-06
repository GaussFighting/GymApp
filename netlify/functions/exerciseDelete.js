import mongoose from "mongoose";
import db from "./server";
import Exercise from "./exerciseModel";

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const id = event.queryStringParameters.id;

    const response = {
      msg: "Exercises successfully deleted",
    };

    await Exercise.deleteOne({ _id: id });

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
