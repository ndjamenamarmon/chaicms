const mongoose = require("mongoose");
const Settings = mongoose.model("settings");

module.exports = (req, res, next) => {
  Settings.find({}, function(err, settings) {
    if (settings[0] && settings[0].setup && !req.user) {
      return res.status(401).send({ error: "You must be logged in" });
    } else {
      next();
    }
  });
  // if (!req.user) {
  //   return res.status(401).send({ error: "You must be logged in" });
  // }
  // next();
};
