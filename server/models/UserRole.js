const mongoose = require("mongoose");
const { Schema } = mongoose;

const userRoleSchema = new Schema({
  name: String
});

mongoose.model("user_roles", userRoleSchema);
