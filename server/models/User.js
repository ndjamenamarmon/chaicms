const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    displayName: String,
    email: String,
    isApproved: Boolean,
    photoURL: String,
    role: String,
    _roleId: { type: Schema.Types.ObjectId, ref: "UserRole" }
  },
  { strict: false }
);

mongoose.model("users", userSchema);
