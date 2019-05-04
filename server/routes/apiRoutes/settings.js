// const passport = require("passport");
const mongoose = require("mongoose");

const Settings = mongoose.model("settings");

module.exports = app => {
  app.get("/api/settings", (req, res) => {
    Settings.find({}, function(err, settings) {
      res.send(settings[0]);
    });
  });

  // Only used when init the cms
  app.post("/api/settings", (req, res) => {
    Settings.findOne({}, async (err, settings) => {
      if (err) {
        let update = new Settings({
          createdAt: Date.now(),
          lastUpdated: Date.now(),
          lastUpdatedBy: req.user._id,
          ...req.body
        });
        try {
          const settings = await update.save();
          res.send(settings);
        } catch (err) {
          res.status(422).send(err);
        }
      } else res.send(settings);
    });
  });

  app.put("/api/settings", (req, res) => {
    Settings.findOne({}, (err, settings) => {
      if (!err) {
        let update = new Settings({
          _id: settings._id,
          lastUpdated: Date.now(),
          lastUpdatedBy: req.user ? req.user._id : "",
          ...req.body
        });
        update.isNew = false;
        update.save(err => {
          if (err) res.send(err);
          else {
            res.send({ message: "ok" });
          }
        });
      } else res.send(err);
    });
  });
};
