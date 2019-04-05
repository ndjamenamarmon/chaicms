const mongoose = require("mongoose");
const { Schema } = mongoose;

const inviteCodeSchema = new Schema({
  code: String,
  status: String
});

mongoose.model("invite_codes", inviteCodeSchema);
