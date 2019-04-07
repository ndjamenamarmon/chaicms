// const passport = require("passport");
const mongoose = require("mongoose");

const UserRole = mongoose.model("user_roles");

module.exports = app => {
  app.get("/api/user_roles", (req, res) => {
    UserRole.find({}, function(err, user_roles) {
      res.send(user_roles);
    });
  });

  app.post("/api/user_roles", (req, res) => {
    // Would also add createdBy and lastUpdatedBy here once user auth is hooked up
    UserRole.find({ name: req.body.name }, async (err, existingUserRole) => {
      if (existingUserRole.length === 0) {
        let update = new UserRole({
          createdAt: Date.now(),
          lastUpdated: Date.now(),
          createdBy: req.user._id,
          lastUpdatedBy: req.user._id,
          ...req.body
        });
        try {
          const user_roles = await update.save();
          res.send(user_roles);
        } catch (err) {
          res.status(422).send(err);
        }
      }
    });
  });

  app.put("/api/user_roles/:id", (req, res) => {
    // Would also add lastUpdatedBy here once user auth is hooked up
    let update = new UserRole({
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
  });

  app.delete("/api/user_roles/:id", (req, res) => {
    UserRole.findOneAndDelete({ _id: req.params.id }, req.body, (err, data) => {
      if (!err) {
        res.send({ message: "deleted" });
      } else {
        res.send(err);
      }
    });
  });

  app.delete("/api/user_roles", (req, res) => {
    UserRole.deleteMany({}, (err, data) => {
      if (!err) {
        res.send({ message: "deleted all", count: data.deletedCount });
      } else {
        res.end(err);
      }
    });
  });
};
