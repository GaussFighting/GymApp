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
  templateExercises: [
    {
      id: String,
      nameEn: String,
      bodyPart: String,
      equipment: String,
      sets: Number,
    },
  ],
});

module.exports = mongoose.model("Templates", schema);
