import uuid from "uuid";
import database from "../firebase/firebase";

// ADD DEFAULT USER ROLES
export const startAddUserRoles = () => {
  return (dispatch, getState) => {
    const userRoles = [
      {
        name: "member"
      },
      {
        name: "author"
      },
      {
        name: "editor"
      },
      {
        name: "developer"
      },
      {
        name: "admin"
      },
      {
        name: "owner"
      }
    ];

    return database
      .ref(`user_roles`)
      .once("value")
      .then(snapshot => {
        const existingUserRoles = [];
        snapshot.forEach(childSnapshot => {
          existingUserRoles.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });

        return userRoles.map(userRole => {
          if (
            !existingUserRoles.find(existingUserRoles => {
              return existingUserRoles.name === userRole.name;
            })
          ) {
            database.ref(`user_roles`).push(userRole);
          }
        });
      });
  };
};

// SET_USER_ROLE_ID
export const setUserRoleId = userRole => ({
  type: "SET_USER_ROLE_ID",
  userRole
});

export const startSetUserRoleId = role => {
  return (dispatch, getState) => {
    return database
      .ref(`user_roles`)
      .once("value")
      .then(snapshot => {
        const userRole = [];
        snapshot.forEach(childSnapshot => {
          if (childSnapshot.val().name === role) {
            userRole.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
            dispatch(setUserRoleId(userRole));
          }
        });
      });
  };
};
