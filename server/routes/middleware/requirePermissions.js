const mongoose = require("mongoose");
const UserRole = mongoose.model("user_roles");
const Settings = mongoose.model("settings");

// module.exports = (req, res, next) => {
//   // get the user's role
//   // look up the permissions available on that user role
//   // permission required must match permission available
//   if (!req.user) {
//     return res.status(401).send({ error: "You must be logged in" });
//   }
//   next();
// };

module.exports = permissions => {
  return function(req, res, next) {
    Settings.find({}, function(err, settings) {
      if (settings[0] && !settings[0].isSetup && !req.user) {
        next();
      } else {
        let permissionFound = false;
        UserRole.findOne({ name: req.user.role }, (err, userRole) => {})
          .then(userRole => {
            permissions.forEach(p => {
              userRole.permissions.forEach(permission => {
                if (p === permission) {
                  permissionFound = true;
                }
              });
            });

            if (!permissionFound) {
              return res
                .status(401)
                .send({ error: "You do not have required permissions." });
            }

            next();
          })
          .catch(err => {
            return res.status(500).send({ error: "Server error 2300197" });
          });
      }
    });
  };
};
