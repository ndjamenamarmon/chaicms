// const passport = require("passport");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const requirePermissions = require("../middleware/requirePermissions");

const ContentType = mongoose.model("content_types");

module.exports = app => {
  // PRIVATE
  app.get(
    "/api/content_types",
    requireLogin,
    requirePermissions(["READ_CONTENT_TYPES"]),
    (req, res) => {
      ContentType.find({}, function(err, contentTypes) {
        res.send(contentTypes);
      });
    }
  );

  app.post(
    "/api/content_types",
    requireLogin,
    requirePermissions(["CREATE_CONTENT_TYPES"]),
    async (req, res) => {
      let update = new ContentType({
        createdAt: Date.now(),
        lastUpdated: Date.now(),
        createdBy: req.user ? req.user._id : "",
        lastUpdatedBy: req.user ? req.user._id : "",
        ...req.body
      });
      try {
        const contentType = await update.save();
        res.send(contentType);
      } catch (err) {
        res.status(422).send(err);
      }
    }
  );

  app.put(
    "/api/content_types/:id",
    requireLogin,
    requirePermissions(["UPDATE_CONTENT_TYPES"]),
    (req, res) => {
      let update = new ContentType({
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
    "/api/content_types/:id",
    requirePermissions(["DELETE_CONTENT_TYPES"]),
    requireLogin,
    (req, res) => {
      ContentType.findOneAndDelete(
        { _id: req.params.id },
        req.body,
        (err, data) => {
          if (!err) {
            res.send({ message: "deleted" });
          } else {
            res.send(err);
          }
        }
      );
    }
  );
};
