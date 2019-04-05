const mongoose = require("mongoose");
const { Schema } = mongoose;

const inviteCodeSchema = new Schema({
  code: String,
  status: String,
  createdAt: Number,
  lastUpdated: Number
});

mongoose.model("invite_codes", inviteCodeSchema);
