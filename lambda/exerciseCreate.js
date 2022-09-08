const mongoose = require("mongoose");
const connectDb = require("../db/connectDb");
const Exercise = require("../models/exerciseModel");

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const data = JSON.parse(event.body);
    const exercise = {
      _id: mongoose.Schema.Types.ObjectId(),
      nameEn: data.nameEn,
      bodyPart: data.bodyPart,
      equipment: data.equipment,
    };
    const response = {
      msg: "Exercises successfully created",
      data: exercise,
    };

    await Exercise.create(exercise);

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
