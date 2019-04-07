const mongoose = require("mongoose");
const { Schema } = mongoose;

const userRoleSchema = new Schema({
  name: String,
  displayName: String,
  permissions: Array,
  createdAt: Number,
  lastUpdated: Number,
  createdBy: String,
  lastUpdatedBy: String
});

mongoose.model("user_roles", userRoleSchema);
