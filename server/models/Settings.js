const mongoose = require("mongoose");
const { Schema } = mongoose;
const SignInMethodsSchema = require("./SignInMethods");

const settingsSchema = new Schema({
  requireInviteCodes: Boolean,
  signInMethods: [SignInMethodsSchema],
  siteDescription: String,
  siteTitle: String,
  theme: String,
  createdAt: Number,
  lastUpdated: Number
});

mongoose.model("settings", settingsSchema);
