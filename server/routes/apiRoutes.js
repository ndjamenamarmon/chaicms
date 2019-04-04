// const passport = require("passport");
const mongoose = require("mongoose");

const User = mongoose.model("users");

module.exports = app => {
  app.get("/api/users", (req, res) => {
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

  app.post("/api/users", (req, res) => {
    res.send("POST to /api/users");
  });
};
