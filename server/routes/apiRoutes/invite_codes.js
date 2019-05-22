// const passport = require("passport");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const requirePermissions = require("../middleware/requirePermissions");

const InviteCode = mongoose.model("invite_codes");

module.exports = app => {
  // PRIVATE
  app.get(
    "/api/invite_codes",
    requireLogin,
    requirePermissions(["READ_INVITE_CODES"]),
    (req, res) => {
      InviteCode.find({}, function(err, invite_codes) {
        res.send(invite_codes);
      });
    }
  );

  app.post(
    "/api/invite_codes",
    requireLogin,
    requirePermissions(["CREATE_INVITE_CODES"]),
    async (req, res) => {
      // Would also add createdBy and lastUpdatedBy here once user auth is hooked up
      let update = new InviteCode({
        createdAt: Date.now(),
        lastUpdated: Date.now(),
        createdBy: req.user._id,
        lastUpdatedBy: req.user._id,
        ...req.body
      });
      try {
        const invite_codes = await update.save();
        res.send(invite_codes);
      } catch (err) {
        res.status(422).send(err);
      }
    }
  );

  app.put(
    "/api/invite_codes/:id",
    requireLogin,
    requirePermissions(["UPDATE_INVITE_CODES"]),
    (req, res) => {
      // Would also add lastUpdatedBy here once user auth is hooked up
      let update = new InviteCode({
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
    "/api/invite_codes/:id",
    requireLogin,
    requirePermissions(["DELETE_INVITE_CODES"]),
    (req, res) => {
      InviteCode.findOneAndDelete(
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

  // PUBLIC
  app.get("/api/invite_codes/byCode/:code", (req, res) => {
    InviteCode.find({ code: req.params.code, status: "enabled" }, function(
      err,
      invite_codes
    ) {
      res.send(invite_codes);
    });
  });
};
