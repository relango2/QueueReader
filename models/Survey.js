const mongoose = require("mongoose");
const { Schema } = mongoose;

const surveySchema = new Schema({
  topic: String,
  key: String,
  value: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date
});

mongoose.model("surveys", surveySchema);
