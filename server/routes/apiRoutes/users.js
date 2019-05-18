// const passport = require("passport");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const User = mongoose.model("users");

module.exports = app => {
  app.get("/api/users", requireLogin, (req, res) => {
    // res.send(req.user);
    User.find({}, function(err, users) {
      // var userMap = {};

      // users.forEach(function(user) {
      //   userMap[user._id] = user;
      // });

      res.send(users);
    });
    // res.send("users");
  });

  // Creating a new user is handled by authRoutes (passport)
  // app.post("/api/users", (req, res) => {
  //   res.send(req.body);
  // });

  app.put("/api/users/:id", requireLogin, (req, res) => {
    // res.send(req.params.id);

    // User.findOne({ _id: req.params.id }).then(user => {
    //   if (user) {
    //     // we have a record, let's update it
    //     done(null, existingUser); // first argument is error
    //   } else {
    //     // we don't have a user record with this ID, give an error
    //     new User({
    //       googleId: profile.id,
    //       displayName: profile.displayName,
    //       email: profile.email,
    //       isApproved: true,
    //       photoURL: profile.photoURL
    //     })
    //       .save()
    //       .then(user => done(null, user)); // new instance of a user, then save to db

    //     done(null, user);
    //   }
    // });

    let update = new User({ _id: req.params.id, ...req.body });
    update.isNew = false;
    update.save(err => {
      if (err) res.send(err);
      else {
        res.send({ message: "ok" });
      }
    });
    // .then(user => {
    //   done(null, user);
    //   res.send({ message: "success" });
    // });

    // res.send(req.body);
  });

  app.delete("/api/users/:id", requireLogin, (req, res) => {
    User.findOneAndDelete({ _id: req.params.id }, req.body, (err, data) => {
      if (!err) {
        res.send({ message: "deleted" });
      } else {
        res.send(err);
      }
    });
  });

  // PUBLIC
  app.get("/api/users/:id", (req, res) => {
    User.find({ _id: req.params.id }, function(err, users) {
      if (users.length > 0) {
        res.send(users[0]);
      } else {
        res.send(null);
      }
    });
  });
};
