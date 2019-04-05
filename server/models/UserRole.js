const mongoose = require("mongoose");
const { Schema } = mongoose;

const userRoleSchema = new Schema({
  name: String,
  createdAt: Number,
  lastUpdated: Number
});

mongoose.model("user_roles", userRoleSchema);
