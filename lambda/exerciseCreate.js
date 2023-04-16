const connectDb = require("../db/connectDb");
const Exercise = require("../models/exerciseModel");

exports.handler = async (event, context) => {
  const mongoose = await connectDb(process.env.REACT_APP_DB);
  context.callbackWaitsForEmptyEventLoop = false;

  const data = JSON.parse(event.body);

  console.log("data", data);
  const exerciseName = data.exerciseName;
  const equipment = data.selectedEquipment;
  const exercises = await Exercise.find({
    nameEn: exerciseName,
    equipment: equipment,
  });
  const response1 = {
    msg: "Exercises successfully found",
    data: {
      exercises,
    },
  };
  console.log("exercises:", exercises);

  if (response1)
    try {
      if (exercises.length > 0) {
        console.log("This Exercise exists in database!");
        const response = {
          msg: "This Exercise exists in database!",
        };
        return { statusCode: 409, body: JSON.stringify(response) };
      }
      const exercise = {
        _id: mongoose.Types.ObjectId(),
        nameEn: data.exerciseName,
        bodyPart: data.selectedBodyPart,
        equipment: data.selectedEquipment,
      };
      const response = {
        msg: "Exercises successfully created",
        data: exercise,
      };

      await Exercise.create(exercise);
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
