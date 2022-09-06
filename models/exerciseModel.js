const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // nameEn: {
  //   type: String,
  //   required: [true, "nameEn field is required"],
  //   max: 200,
  // },
  // bodyPart: {
  //   type: String,
  //   required: [true, "bodyPart field is required"],
  //   max: 200,
  // },
  // equipment: {
  //   type: String,
  //   required: [true, "equipment field is required"],
  //   max: 200,
  // },
});

module.exports = mongoose.model("Exercises", exerciseSchema);
