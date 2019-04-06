// import uuid from "uuid";
// import database from "../firebase/firebase";
import axios from "axios";

// ADD_ENTRY
export const addEntry = entry => ({
  type: "ADD_ENTRY",
  entry
});

export const startAddEntry = (entryData = {}) => {
  return async dispatch => {
    const entry = {
      contentTypeId: entryData.contentTypeId,
      ...entryData.entry
    };
    const res = await axios.post("/api/entries", entry);
    dispatch(addEntry(res.data));
  };
  // return (dispatch, getState) => {
  //   const entry = {
  //     contentTypeId: entryData.contentTypeId,
  //     ...entryData.entry
  //   };

  //   return database
  //     .ref(`entries`)
  //     .push(entry)
  //     .then(ref => {
  //       dispatch(
  //         addEntry({
  //           id: ref.key,
  //           ...entry
  //         })
  //       );
  //     });
  // };
};

// REMOVE_ENTRY
export const removeEntry = ({ id } = {}) => ({
  type: "REMOVE_ENTRY",
  id
});

export const startRemoveEntry = ({ id } = {}) => {
  return async dispatch => {
    const res = await axios.delete(`/api/entries/${id}`);
    dispatch(removeEntry({ id }));
  };
  // return (dispatch, getState) => {
  //   return database
  //     .ref(`entries/${id}`)
  //     .remove()
  //     .then(() => {
  //       dispatch(removeEntry({ id }));
  //     });
  // };
};

// EDIT_ENTRY
export const editEntry = (id, updates) => ({
  type: "EDIT_ENTRY",
  id,
  updates
});

export const startEditEntry = (id, updates) => {
  return async dispatch => {
    const res = await axios.put(`/api/entries/${id}`);
    dispatch(editEntry(id, updates));
  };
  // return (dispatch, getState) => {
  //   return database
  //     .ref(`entries/${id}`)
  //     .update(updates)
  //     .then(() => {
  //       dispatch(editEntry(id, updates));
  //     });
  // };
};

// SET_ENTRIES
export const setEntries = entries => ({
  type: "SET_ENTRIES",
  entries
});

export const startSetEntries = () => {
  return async dispatch => {
    const res = await axios.get("/api/entries");
    dispatch(setEntries(res.data));
  };
  // return (dispatch, getState) => {
  //   // only populate if current user is author, editor, developer, admin, or owner
  //   // get the role id of the current user (where auth.uid === user.uid)
  //   // fetch the role based on that id from the db
  //   // if that role is an author, editor, developer, admin, or owner, go ahead and populate the content types (otherwise, don't)
  //   // return database
  //   //   .ref(`users`)
  //   //   .once("value")
  //   //   .then(snapshot => {
  //   //     snapshot.forEach(childSnapshot => {
  //   //       if (childSnapshot.val().uid === getState().auth.uid) {
  //   //         const roleId = childSnapshot.val().roleId;

  //   //         return database
  //   //           .ref(`user_roles/${roleId}`)
  //   //           .once("value")
  //   //           .then(snapshot => {
  //   //             const role = snapshot.val().name;

  //   //             if (
  //   //               role === "author" ||
  //   //               role === "editor" ||
  //   //               role === "developer" ||
  //   //               role === "admin" ||
  //   //               role === "owner"
  //   //             ) {
  //   return database
  //     .ref(`entries`)
  //     .once("value")
  //     .then(snapshot => {
  //       const entries = [];
  //       snapshot.forEach(childSnapshot => {
  //         entries.push({
  //           id: childSnapshot.key,
  //           ...childSnapshot.val()
  //         });
  //       });

  //       dispatch(setEntries(entries));
  //     });
  //   //           }
  //   //         });
  //   //     }
  //   //   });
  //   // });
  // };
};
