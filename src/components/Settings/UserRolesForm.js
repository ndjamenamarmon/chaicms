import React, { useState } from "react";
import Toggle from "react-toggle";

export const UserRolesForm = props => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userRoles, setUserRoles] = useState(props.userRoles);

  const onSubmit = e => {
    e.preventDefault();
    const isChecked = e.target.checked ? true : false;
    const changedPermission = e.target.value;
    const changedUserRole = e.target.name;

    const newUserRoles = userRoles.map(userRole => {
      if (userRole._id === changedUserRole) {
        let newPermissions = userRole.permissions;
        if (isChecked && !newPermissions.includes(changedPermission)) {
          newPermissions.push(changedPermission);
        } else if (!isChecked && newPermissions.includes(changedPermission)) {
          newPermissions = newPermissions.filter(permission => {
            return permission !== changedPermission;
          });
        }
        return {
          ...userRole,
          permissions: newPermissions
        };
      } else {
        return userRole;
      }
    });
    console.log("new user roles", newUserRoles);

    setUserRoles(newUserRoles);

    const newUserRole = newUserRoles.filter(userRole => {
      if (userRole._id === changedUserRole) {
        return userRole;
      } else {
        return false;
      }
    })[0];

    console.log(newUserRole);

    props.onUserRolesSubmit(newUserRole);
  };
  return (
    <form className="form" onSubmit={onSubmit}>
      {error && <p className="form__error">{error}</p>}
      {success && <p className="form__success">{success}</p>}

      <h3>User Role Permissions</h3>

      {userRoles.map(userRole => {
        // console.log(userRole);
        let permissionTypes = [
          "CONTENT_TYPES",
          "ENTRIES",
          "OWN_ENTRIES",
          "FIELDS",
          "INVITE_CODES",
          "USER_ROLES",
          "USERS"
        ];
        return (
          <div key={userRole._id}>
            <h4>{userRole.displayName}</h4>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th />
                  <th>CREATE</th>
                  <th>READ</th>
                  <th>UPDATE</th>
                  <th>DELETE</th>
                </tr>
              </thead>
              <tbody>
                {permissionTypes.map(permissionType => {
                  return (
                    <tr key={userRole._id + permissionType}>
                      <td>{permissionType}</td>
                      <td style={{ textAlign: "center" }}>
                        {
                          <input
                            type="checkbox"
                            className="checkbox"
                            value={`CREATE_${permissionType}`}
                            name={userRole._id}
                            onChange={onSubmit}
                            checked={
                              userRole.permissions.filter(permission => {
                                if (
                                  permission.split(permissionType)[0] ===
                                  "CREATE_"
                                ) {
                                  return permission;
                                } else return false;
                              }).length > 0
                            }
                            aria-label={`CREATE_${permissionType}`}
                          />
                        }
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {
                          <input
                            type="checkbox"
                            className="checkbox"
                            value={`READ_${permissionType}`}
                            name={userRole._id}
                            onChange={onSubmit}
                            checked={
                              userRole.permissions.filter(permission => {
                                if (
                                  permission.split(permissionType)[0] ===
                                  "READ_"
                                ) {
                                  return permission;
                                } else return false;
                              }).length > 0
                            }
                            aria-label={`READ_${permissionType}`}
                          />
                        }
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {
                          <input
                            type="checkbox"
                            className="checkbox"
                            value={`UPDATE_${permissionType}`}
                            name={userRole._id}
                            onChange={onSubmit}
                            checked={
                              userRole.permissions.filter(permission => {
                                if (
                                  permission.split(permissionType)[0] ===
                                  "UPDATE_"
                                ) {
                                  return permission;
                                } else return false;
                              }).length > 0
                            }
                            aria-label={`UPDATE_${permissionType}`}
                          />
                        }
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {
                          <input
                            type="checkbox"
                            className="checkbox"
                            value={`DELETE_${permissionType}`}
                            name={userRole._id}
                            onChange={onSubmit}
                            checked={
                              userRole.permissions.filter(permission => {
                                if (
                                  permission.split(permissionType)[0] ===
                                  "DELETE_"
                                ) {
                                  return permission;
                                } else return false;
                              }).length > 0
                            }
                            aria-label={`DELETE_${permissionType}`}
                          />
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}

      <div>
        <button className="button">Save Settings</button>
      </div>
    </form>
  );
};

export default UserRolesForm;
