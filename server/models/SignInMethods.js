const mongoose = require("mongoose");
const { Schema } = mongoose;

const signInMethodsSchema = new Schema({
  enabled: Boolean,
  name: String,
  type: String,
  clientID: String,
  clientSecret: String
});

mongoose.model("signInMethods", signInMethodsSchema);
