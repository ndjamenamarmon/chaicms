const mongoose = require("mongoose");
const { Schema } = mongoose;
const SignInMethodsSchema = require("./SignInMethods");

const settingsSchema = new Schema({
  requireInviteCodes: Boolean,
  isSetup: Boolean,
  signInMethods: [SignInMethodsSchema],
  defaultUserRole: String,
  siteDescription: String,
  siteTitle: String,
  theme: String,
  createdAt: Number,
  lastUpdated: Number,
  lastUpdatedBy: String
});

mongoose.model("settings", settingsSchema);
