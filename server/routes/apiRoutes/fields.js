// const passport = require("passport");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Field = mongoose.model("fields");

module.exports = app => {
  // PRIVATE
  app.get("/api/fields", requireLogin, (req, res) => {
    Field.find({}, function(err, fields) {
      res.send(fields);
    });
  });

  app.post("/api/fields", requireLogin, async (req, res) => {
    let update = new Field({
      createdAt: Date.now(),
      lastUpdated: Date.now(),
      createdBy: req.user._id,
      lastUpdatedBy: req.user._id,
      ...req.body
    });
    try {
      const fields = await update.save();
      res.send(fields);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.put("/api/fields/:id", requireLogin, (req, res) => {
    let update = new Field({
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

  app.delete("/api/fields/:id", requireLogin, (req, res) => {
    Field.findOneAndDelete({ _id: req.params.id }, req.body, (err, data) => {
      if (!err) {
        res.send({ message: "deleted" });
      } else {
        res.send(err);
      }
    });
  });
};
