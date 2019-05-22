const mongoose = require("mongoose");
const UserRole = mongoose.model("user_roles");

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
    let permissionFound = false;
    UserRole.findOne({ name: req.user.role }, (err, userRole) => {
      permissions.forEach(p => {
        userRole.permissions.forEach(permission => {
          if (p === permission) {
            if (!err) {
              permissionFound = true;
            }
          }
        });
      });
    }).then(() => {
      if (!permissionFound) {
        return res
          .status(401)
          .send({ error: "You do not have required permissions." });
      }

      next();
    });
  };
};
