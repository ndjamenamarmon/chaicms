const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  email: String,
  isApproved: Boolean,
  photoURL: String,
  role: String,
  _roleId: { type: Schema.Types.ObjectId, ref: "UserRole" }
});

mongoose.model("users", userSchema);
