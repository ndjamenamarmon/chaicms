// import uuid from "uuid";
// import database from "../firebase/firebase";
import axios from "axios";

// ADD_FIELD
export const addField = field => ({
  type: "ADD_FIELD",
  field
});

export const startAddField = (fieldData = {}) => {
  return async dispatch => {
    const {
      name = "",
      apiKey = "",
      type = "",
      display = "",
      helpText = "",
      isRequired = false,
      isUnique = false
    } = fieldData;
    const field = {
      name,
      apiKey,
      type,
      display,
      helpText,
      isRequired,
      isUnique
    };
    const res = await axios.post("/api/fields", field);
    dispatch(addField(res.data));
  };
  // return (dispatch, getState) => {
  //   const {
  //     name = "",
  //     apiKey = "",
  //     type = "",
  //     display = "",
  //     helpText = "",
  //     isRequired = false,
  //     isUnique = false,
  //     createdAt = 0,
  //     lastUpdated = 0,
  //     createdBy = ""
  //   } = fieldData;
  //   const field = {
  //     name,
  //     apiKey,
  //     type,
  //     display,
  //     helpText,
  //     isRequired,
  //     isUnique,
  //     createdAt,
  //     lastUpdated,
  //     createdBy
  //   };

  //   return database
  //     .ref(`fields`)
  //     .push(field)
  //     .then(ref => {
  //       dispatch(
  //         addField({
  //           id: ref.key,
  //           ...field
  //         })
  //       );
  //     });
  // };
};

// REMOVE_FIELD
export const removeField = ({ id } = {}) => ({
  type: "REMOVE_FIELD",
  id
});

export const startRemoveField = ({ id } = {}) => {
  return async dispatch => {
    const res = await axios.delete(`/api/fields/${id}`);
    dispatch(removeField({ id }));
  };
  // return (dispatch, getState) => {
  //   return database
  //     .ref(`fields/${id}`)
  //     .remove()
  //     .then(() => {
  //       dispatch(removeField({ id }));
  //     });
  // };
};

// EDIT_FIELD
export const editField = (id, updates) => ({
  type: "EDIT_FIELD",
  id,
  updates
});

export const startEditField = (id, updates) => {
  return async dispatch => {
    const res = await axios.put(`/api/fields/${id}`, updates);
    dispatch(editField(id, updates));
  };
  // return (dispatch, getState) => {
  //   return database
  //     .ref(`fields/${id}`)
  //     .update(updates)
  //     .then(() => {
  //       dispatch(editField(id, updates));
  //     });
  // };
};

// SET_FIELDS
export const setFields = fields => ({
  type: "SET_FIELDS",
  fields
});

export const startSetFields = () => {
  return async dispatch => {
    const res = await axios.get("/api/fields");
    dispatch(setFields(res.data));
  };
  // return (dispatch, getState) => {
  //   // only populate if current user is developer, admin, or owner
  //   // get the role id of the current user (where auth.uid === user.uid)
  //   // fetch the role based on that id from the db
  //   // if that role is a developer, admin, or owner, go ahead and populate the content types (otherwise, don't)
  //   return database
  //     .ref(`users`)
  //     .once("value")
  //     .then(snapshot => {
  //       snapshot.forEach(childSnapshot => {
  //         if (childSnapshot.val().uid === getState().auth.uid) {
  //           const roleId = childSnapshot.val().roleId;

  //           return database
  //             .ref(`user_roles/${roleId}`)
  //             .once("value")
  //             .then(snapshot => {
  //               const role = snapshot.val().name;

  //               if (
  //                 role === "author" ||
  //                 role === "editor" ||
  //                 role === "developer" ||
  //                 role === "admin" ||
  //                 role === "owner"
  //               ) {
  //                 return database
  //                   .ref(`fields`)
  //                   .once("value")
  //                   .then(snapshot => {
  //                     const fields = [];
  //                     snapshot.forEach(childSnapshot => {
  //                       fields.push({
  //                         id: childSnapshot.key,
  //                         ...childSnapshot.val()
  //                       });
  //                     });

  //                     dispatch(setFields(fields));
  //                   });
  //               }
  //             });
  //         }
  //       });
  //     });
  // };
};
