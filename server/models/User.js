const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  email: String,
  isApproved: Boolean,
  photoURL: String,
  role: String,
  roleId: String
});

mongoose.model("users", userSchema);
