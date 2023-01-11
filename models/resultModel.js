const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  templateName: {
    type: String,
    required: [true, "templateName field is required"],
    max: 200,
  },
  description: {
    type: String,
    required: [true, "description field is required"],
    max: 1000,
  },
  bodyWeight: {
    type: Number,
    required: [true, "description field is required"],
    max: 1000,
  },
  date: {
    type: String,
    required: [true, "date field is required"],
    max: 1000,
  },
  templateExercises: [
    {
      id: String,
      nameEn: String,
      bodyPart: String,
      equipment: String,
      sets: Number,
      addedResults: [
        {
          id: String,
          setWeight: Number,
          setRepetition: Number,
          // setDistance: Number,
          // setTime: Number,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Results", schema);
