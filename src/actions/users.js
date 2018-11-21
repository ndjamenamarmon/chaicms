import uuid from "uuid";
import database from "../firebase/firebase";

// ADD_USERS
export const addUser = user => ({
  type: "ADD_USER",
  user
});

export const startAddUser = user => {
  return (dispatch, getState) => {
    return database
      .ref(`users`)
      .push(user)
      .then(ref => {
        dispatch(
          addUser({
            id: ref.key,
            ...user
          })
        );
      });
  };
};

// EDIT_USER
export const editUser = (id, updates) => ({
  type: "EDIT_USER",
  id,
  updates
});

export const startEditUser = (id, updates) => {
  return (dispatch, getState) => {
    return database
      .ref(`users/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editUser(id, updates));
      });
  };
};

// SET_USERS
export const setUsers = users => ({
  type: "SET_USERS",
  users
});

export const startSetUsers = () => {
  return (dispatch, getState) => {
    return database
      .ref(`users`)
      .once("value")
      .then(snapshot => {
        const users = [];
        snapshot.forEach(childSnapshot => {
          users.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setUsers(users));
      });
  };
};

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
