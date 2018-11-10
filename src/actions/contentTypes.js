import uuid from "uuid";
import database from "../firebase/firebase";
import moment from "moment";

// ADD_CONTENT_TYPE
export const addContentType = contentType => ({
  type: "ADD_CONTENT_TYPE",
  contentType
});

export const startAddContentType = (contentTypeData = {}) => {
  return (dispatch, getState) => {
    const {
      title = "",
      apiKey = "",
      fields = [],
      createdAt = 0,
      lastUpdated = 0,
      titleField = ""
    } = contentTypeData;
    const contentType = {
      title,
      apiKey,
      fields,
      createdAt,
      lastUpdated,
      titleField
    };

    return database
      .ref(`content_types`)
      .push(contentType)
      .then(ref => {
        dispatch(
          addContentType({
            id: ref.key,
            ...contentType
          })
        );
      });
  };
};

// REMOVE_CONTENT_TYPE
export const removeContentType = ({ id } = {}) => ({
  type: "REMOVE_CONTENT_TYPE",
  id
});

export const startRemoveContentType = ({ id } = {}) => {
  return (dispatch, getState) => {
    return database
      .ref(`content_types/${id}`)
      .remove()
      .then(() => {
        dispatch(removeContentType({ id }));
      });
  };
};

// EDIT_CONTENT_TYPE
export const editContentType = (id, updates) => ({
  type: "EDIT_CONTENT_TYPE",
  id,
  updates
});

export const startEditContentType = (id, updates) => {
  return (dispatch, getState) => {
    return database
      .ref(`content_types/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editContentType(id, updates));
      });
  };
};

// SET_CONTENT_TYPES
export const setContentTypes = contentTypes => ({
  type: "SET_CONTENT_TYPES",
  contentTypes
});

export const startSetContentTypes = () => {
  return (dispatch, getState) => {
    return database
      .ref(`content_types`)
      .once("value")
      .then(snapshot => {
        const contentTypes = [];
        snapshot.forEach(childSnapshot => {
          contentTypes.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });

        dispatch(setContentTypes(contentTypes));
      });
  };
};
