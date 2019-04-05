const mongoose = require("mongoose");
const { Schema } = mongoose;

const fieldSchema = new Schema({
  apiKey: String,
  createdAt: Number,
  display: String,
  helpText: String,
  isRequired: Boolean,
  isUnique: Boolean,
  lastUpdated: Number,
  name: String,
  type: String
});

mongoose.model("fields", fieldSchema);
