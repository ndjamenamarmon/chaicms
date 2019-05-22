// const passport = require("passport");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const requirePermissions = require("../middleware/requirePermissions");

const Settings = mongoose.model("settings");

module.exports = app => {
  // PRIVATE
  app.get("/api/settings", requireLogin, (req, res) => {
    Settings.find({}, function(err, settings) {
      res.send(settings[0]);
    });
  });

  app.put(
    "/api/settings",
    requireLogin,
    requirePermissions(["UPDATE_SETTINGS"]),
    (req, res) => {
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
    }
  );

  // PUBLIC
  app.get("/api/public/settings", (req, res) => {
    Settings.find({}, function(err, settings) {
      res.send({
        signInMethods: settings[0].signInMethods,
        requireInviteCodes: settings[0].requireInviteCodes,
        theme: settings[0].theme,
        siteDescription: settings[0].siteDescription,
        siteTitle: settings[0].siteTitle
      });
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
};
