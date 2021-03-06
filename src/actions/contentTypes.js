// import uuid from "uuid";
// import database from "../firebase/firebase";
import moment from "moment";
import axios from "axios";

// ADD_CONTENT_TYPE
export const addContentType = contentType => ({
  type: "ADD_CONTENT_TYPE",
  contentType
});

export const startAddContentType = (contentTypeData = {}) => {
  return async dispatch => {
    const {
      title = "",
      apiKey = "",
      fields = [],
      titleField = ""
    } = contentTypeData;
    const contentType = {
      title,
      apiKey,
      fields,
      titleField
    };
    const res = await axios.post("/api/content_types", contentType);
    dispatch(addContentType(res.data));
  };
  // return (dispatch, getState) => {
  //   const {
  //     title = "",
  //     apiKey = "",
  //     fields = [],
  //     createdAt = 0,
  //     lastUpdated = 0,
  //     titleField = "",
  //     createdBy = ""
  //   } = contentTypeData;
  //   const contentType = {
  //     title,
  //     apiKey,
  //     fields,
  //     createdAt,
  //     lastUpdated,
  //     titleField,
  //     createdBy
  //   };

  //   return database
  //     .ref(`content_types`)
  //     .push(contentType)
  //     .then(ref => {
  //       dispatch(
  //         addContentType({
  //           id: ref.key,
  //           ...contentType
  //         })
  //       );
  //     });
  // };
};

// REMOVE_CONTENT_TYPE
export const removeContentType = ({ id } = {}) => ({
  type: "REMOVE_CONTENT_TYPE",
  id
});

export const startRemoveContentType = ({ id } = {}) => {
  return async dispatch => {
    const res = await axios.delete(`/api/content_types/${id}`);
    dispatch(removeContentType(id));
  };
  // return (dispatch, getState) => {
  //   return database
  //     .ref(`content_types/${id}`)
  //     .remove()
  //     .then(() => {
  //       dispatch(removeContentType({ id }));
  //     });
  // };
};

// EDIT_CONTENT_TYPE
export const editContentType = (id, updates) => ({
  type: "EDIT_CONTENT_TYPE",
  id,
  updates
});

export const startEditContentType = (id, updates) => {
  return async dispatch => {
    const res = await axios.put(`/api/content_types/${id}`, updates);
    dispatch(editContentType(id, updates));
  };
  // return (dispatch, getState) => {
  //   return database
  //     .ref(`content_types/${id}`)
  //     .update(updates)
  //     .then(() => {
  //       dispatch(editContentType(id, updates));
  //     });
  // };
};

// SET_CONTENT_TYPES
export const setContentTypes = contentTypes => ({
  type: "SET_CONTENT_TYPES",
  contentTypes
});

export const startSetContentTypes = () => {
  return async dispatch => {
    const res = await axios.get("/api/content_types");
    dispatch(setContentTypes(res.data));
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
  //                   .ref(`content_types`)
  //                   .once("value")
  //                   .then(snapshot => {
  //                     const contentTypes = [];
  //                     snapshot.forEach(childSnapshot => {
  //                       contentTypes.push({
  //                         id: childSnapshot.key,
  //                         ...childSnapshot.val()
  //                       });
  //                     });

  //                     dispatch(setContentTypes(contentTypes));
  //                   });
  //               }
  //             });
  //         }
  //       });
  //     });
  // };
};
