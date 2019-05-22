// const passport = require("passport");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const requirePermissions = require("../middleware/requirePermissions");

const Entry = mongoose.model("entries");

module.exports = app => {
  // PRIVATE
  app.get(
    "/api/entries",
    requireLogin,
    requirePermissions(["READ_ENTRIES"]),
    (req, res) => {
      Entry.find({}, function(err, entries) {
        res.send(entries);
      });
    }
  );

  app.post(
    "/api/entries",
    requireLogin,
    requirePermissions(["CREATE_ENTRIES"]),
    async (req, res) => {
      let update = new Entry({
        createdAt: Date.now(),
        lastUpdated: Date.now(),
        createdBy: req.user._id,
        lastUpdatedBy: req.user._id,
        ...req.body
      });
      try {
        const entry = await update.save();
        res.send(entry);
      } catch (err) {
        res.status(422).send(err);
      }
    }
  );

  app.put(
    "/api/entries/:id",
    requireLogin,
    requirePermissions(["UPDATE_ENTRIES"]),
    (req, res) => {
      let update = new Entry({
        _id: req.params.id,
        lastUpdated: Date.now(),
        lastUpdatedBy: req.user._id,
        ...req.body
      });
      update.isNew = false;
      update.save(err => {
        if (err) res.send(err);
        else {
          res.send({ message: "ok" });
        }
      });
    }
  );

  app.delete(
    "/api/entries/:id",
    requireLogin,
    requirePermissions(["DELETE_ENTRIES"]),
    (req, res) => {
      Entry.findOneAndDelete({ _id: req.params.id }, req.body, (err, data) => {
        if (!err) {
          res.send({ message: "deleted" });
        } else {
          res.send(err);
        }
      });
    }
  );
};
