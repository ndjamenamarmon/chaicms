import React, { useState } from "react";
import Toggle from "react-toggle";

export const UserRolesForm = props => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userRoles, setUserRoles] = useState(props.userRoles);

  const onSubmit = e => {
    e.preventDefault();

    // props.onSubmit({
    //   ...props.settings,
    //   signInMethods,
    //   defaultUserRole
    // });
  };
  return (
    <form className="form" onSubmit={onSubmit}>
      {error && <p className="form__error">{error}</p>}
      {success && <p className="form__success">{success}</p>}

      <h3>User Role Permissions</h3>

      {userRoles.map(userRole => {
        console.log(userRole.permissions);
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
            <table>
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
                  console.log(permissionType);
                  // {permission.split("CREATE_")[0]}
                  return (
                    <tr key={userRole._id + permissionType}>
                      <th>{permissionType}</th>
                      <td>
                        {userRole.permissions.filter(permission => {
                          if (
                            permission.split(permissionType)[0] === "CREATE_"
                          ) {
                            return permission;
                          } else return false;
                        }).length > 0
                          ? "X"
                          : ""}
                      </td>
                      <td>
                        {userRole.permissions.filter(permission => {
                          if (
                            permission.split(permissionType)[0] === "READ_"
                          ) {
                            return permission;
                          } else return false;
                        }).length > 0
                          ? "X"
                          : ""}
                      </td>
                      <td>
                        {userRole.permissions.filter(permission => {
                          if (
                            permission.split(permissionType)[0] === "UPDATE_"
                          ) {
                            return permission;
                          } else return false;
                        }).length > 0
                          ? "X"
                          : ""}
                      </td>
                      <td>
                        {userRole.permissions.filter(permission => {
                          if (
                            permission.split(permissionType)[0] === "DELETE_"
                          ) {
                            return permission;
                          } else return false;
                        }).length > 0
                          ? "X"
                          : ""}
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
