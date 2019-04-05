const mongoose = require("mongoose");
const { Schema } = mongoose;

const fieldSchema = new Schema({
  apiKey: String,
  createdAt: Number,
  createdBy: String,
  display: String,
  helpText: String,
  isRequired: Boolean,
  isUnique: Boolean,
  lastUpdated: Number,
  lastUpdatedBy: String,
  name: String,
  type: String
});

mongoose.model("fields", fieldSchema);
