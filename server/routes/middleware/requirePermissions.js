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

const userRoles = [
  {
    name: "member",
    displayName: "Member",
    permissions: []
  },
  {
    name: "author",
    displayName: "Author",
    permissions: [
      "CREATE_ENTRIES",
      "CREATE_OWN_ENTRIES",
      "READ_OWN_ENTRIES",
      "UPDATE_OWN_ENTRIES"
    ]
  },
  {
    name: "editor",
    displayName: "Editor",
    permissions: [
      "CREATE_ENTRIES",
      "READ_ENTRIES",
      "UPDATE_ENTRIES",
      "DELETE_ENTRIES",
      "CREATE_OWN_ENTRIES",
      "READ_OWN_ENTRIES",
      "UPDATE_OWN_ENTRIES",
      "DELETE_OWN_ENTRIES"
    ]
  },
  {
    name: "developer",
    displayName: "Developer",
    permissions: [
      "READ_CONTENT_TYPES",
      "READ_ENTRIES",
      "READ_FIELDS",
      "READ_INVITE_CODES",
      "READ_USER_ROLES",
      "READ_USERS",
      "CREATE_CONTENT_TYPES",
      "DELETE_CONTENT_TYPES",
      "UPDATE_CONTENT_TYPES",
      "CREATE_FIELDS",
      "DELETE_FIELDS",
      "UPDATE_FIELDS",
      "CREATE_ENTRIES",
      "UPDATE_ENTRIES",
      "DELETE_ENTRIES",
      "CREATE_OWN_ENTRIES",
      "READ_OWN_ENTRIES",
      "UPDATE_OWN_ENTRIES",
      "DELETE_OWN_ENTRIES"
    ]
  },
  {
    name: "admin",
    displayName: "Admin",
    permissions: [
      "READ_CONTENT_TYPES",
      "READ_ENTRIES",
      "READ_FIELDS",
      "READ_INVITE_CODES",
      "READ_USER_ROLES",
      "READ_USERS",
      "CREATE_CONTENT_TYPES",
      "DELETE_CONTENT_TYPES",
      "UPDATE_CONTENT_TYPES",
      "CREATE_FIELDS",
      "DELETE_FIELDS",
      "UPDATE_FIELDS",
      "CREATE_ENTRIES",
      "UPDATE_ENTRIES",
      "DELETE_ENTRIES",
      "UPDATE_SETTINGS",
      "UPDATE_USER_ROLES",
      "CREATE_OWN_ENTRIES",
      "READ_OWN_ENTRIES",
      "UPDATE_OWN_ENTRIES",
      "DELETE_OWN_ENTRIES",
      "CREATE_INVITE_CODES",
      "UPDATE_INVITE_CODES",
      "DELETE_INVITE_CODES",
      "UPDATE_USERS"
    ]
  },
  {
    name: "owner",
    displayName: "Owner",
    permissions: [
      "READ_CONTENT_TYPES",
      "READ_ENTRIES",
      "READ_FIELDS",
      "READ_INVITE_CODES",
      "READ_USER_ROLES",
      "READ_USERS",
      "CREATE_CONTENT_TYPES",
      "DELETE_CONTENT_TYPES",
      "UPDATE_CONTENT_TYPES",
      "CREATE_FIELDS",
      "DELETE_FIELDS",
      "UPDATE_FIELDS",
      "CREATE_ENTRIES",
      "UPDATE_ENTRIES",
      "DELETE_ENTRIES",
      "UPDATE_SETTINGS",
      "UPDATE_USER_ROLES",
      "CREATE_INVITE_CODES",
      "CREATE_USER_ROLES",
      "CREATE_USERS",
      "CREATE_OWN_ENTRIES",
      "READ_OWN_ENTRIES",
      "UPDATE_OWN_ENTRIES",
      "DELETE_OWN_ENTRIES",
      "UPDATE_INVITE_CODES",
      "DELETE_INVITE_CODES",
      "DELETE_USER_ROLES",
      "UPDATE_USERS",
      "DELETE_USERS"
    ]
  }
];

module.exports = permissions => {
  return function(req, res, next) {
    Settings.find({}, function(err, settings) {
      if (settings[0] && !settings[0].setup && !req.user) {
        next();
      } else {
        let permissionFound = false;
        // if there are no user roles, then create the default user roles
        UserRole.count({}, function(err, count) {
          if (count > 0) {
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
          } else {
            userRoles.map(userRole => {
              UserRole.find(
                { name: userRole.name },
                async (err, existingUserRole) => {
                  if (existingUserRole.length === 0) {
                    let update = new UserRole({
                      createdAt: Date.now(),
                      lastUpdated: Date.now(),
                      createdBy: req.user._id,
                      lastUpdatedBy: req.user._id,
                      ...userRole
                    });
                    try {
                      const user_roles = await update.save();

                      // now get the permissions
                      UserRole.findOne(
                        { name: req.user.role },
                        (err, userRole) => {}
                      )
                        .then(userRole => {
                          permissions.forEach(p => {
                            userRole.permissions.forEach(permission => {
                              if (p === permission) {
                                permissionFound = true;
                              }
                            });
                          });

                          if (!permissionFound) {
                            return res.status(401).send({
                              error: "You do not have required permissions."
                            });
                          }

                          next();
                        })
                        .catch(err => {
                          return res
                            .status(500)
                            .send({ error: "Server error 1024701" });
                        });
                    } catch (err) {
                      res.status(422).send(err);
                    }
                  }
                }
              );
            });
          }
        });
      }
    });
  };
};
