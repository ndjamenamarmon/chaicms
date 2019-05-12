// import uuid from "uuid";
// import database from "../firebase/firebase";
import axios from "axios";

// ADD_USERS
export const addUser = user => ({
  type: "ADD_USER",
  user
});

export const startAddUser = () => {
  return async dispatch => {
    // const res = await axios.post("/api/users", user);
    const res = await axios.get("/auth/google"); // TO DO: Need to be able to handle github, etc
    dispatch(addUser(res.data));
  };
  // return (dispatch, getState) => {
  //   return database
  //     .ref(`user_roles`)
  //     .once("value")
  //     .then(snapshot => {
  //       let userRoleId;
  //       snapshot.forEach(childSnapshot => {
  //         if (childSnapshot.val().name === user.role) {
  //           userRoleId = childSnapshot.key;
  //         }
  //       });
  //       const newUser = { roleId: userRoleId, ...user };

  //       return database
  //         .ref(`users`)
  //         .push(newUser)
  //         .then(ref => {
  //           dispatch(
  //             addUser({
  //               id: ref.key,
  //               ...newUser
  //             })
  //           );
  //         });
  //     });
  // };
};

// EDIT_USER
export const editUser = (id, updates) => ({
  type: "EDIT_USER",
  id,
  updates
});

export const startEditUser = (id, updates) => {
  return async dispatch => {
    const res = await axios.put(`/api/users/${id}`);
    dispatch(editUser(id, updates));
  };
  // return (dispatch, getState) => {
  //   return database
  //     .ref(`users/${id}`)
  //     .update(updates)
  //     .then(() => {
  //       dispatch(editUser(id, updates));
  //     });
  // };
};

// SET_USERS
export const setUsers = users => ({
  type: "SET_USERS",
  users
});

export const startSetUsers = () => {
  return async (dispatch, getState) => {
    // need to only populate this with users if the role of the current user is admin or owner -> would break registration
    const res = await axios.get("/api/users");
    dispatch(setUsers(res.data));
  };
};
