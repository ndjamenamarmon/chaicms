const mongoose = require("mongoose");
const { Schema } = mongoose;

const contentTypeSchema = new Schema({
  apiKey: String,
  createdAt: Number,
  createdBy: String,
  fields: Array,
  lastUpdated: Number,
  lastUpdatedBy: String,
  title: String,
  titleField: String
});

mongoose.model("content_types", contentTypeSchema);
