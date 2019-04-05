const mongoose = require("mongoose");
const { Schema } = mongoose;

const signInMethodsSchema = new Schema({
  enabled: Boolean,
  name: String,
  type: String
});

mongoose.model("signInMethods", signInMethodsSchema);
