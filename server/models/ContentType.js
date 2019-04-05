const mongoose = require("mongoose");
const { Schema } = mongoose;

const contentTypeSchema = new Schema({
  apiKey: String,
  createdAt: Number,
  createdBy: String, // should be a ref
  fields: Array,
  lastUpdated: Number,
  lastUpdatedBy: String, // should be a ref
  title: String,
  titleField: String
});

mongoose.model("content_types", contentTypeSchema);
