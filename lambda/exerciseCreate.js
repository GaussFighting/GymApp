const mongoose = require("mongoose");
const connectDb = require("../db/connectDb");
const Exercise = require("../models/exerciseModel");

exports.handler = async (event, context) => {
  await connectDb(process.env.REACT_APP_DB);
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const data = JSON.parse(event.body);
    const exercise = {
      _id: mongoose.Types.ObjectId,
      nameEn: data.exerciseName,
      bodyPart: data.selectedBodyPart,
      equipment: data.selectedEquipment,
    };
    const response = {
      msg: "Exercises successfully created",
      data: exercise,
    };

    await Exercise.create(exercise);
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
