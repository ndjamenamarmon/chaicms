import uuid from "uuid";
import database from "../firebase/firebase";

// EDIT_SETTINGS
export const editSettings = updates => ({
  type: "EDIT_SETTINGS",
  updates
});

export const startEditSettings = updates => {
  return (dispatch, getState) => {
    return database
      .ref("settings")
      .update(updates)
      .then(() => {
        dispatch(editSettings(updates));
      });
  };
};

// SET_SETTINGS
export const setSettings = settings => ({
  type: "SET_SETTINGS",
  settings
});

export const startSetSettings = () => {
  return (dispatch, getState) => {
    return database
      .ref("settings")
      .once("value")
      .then(snapshot => {
        const settings = {
          siteDescription: snapshot.val().siteDescription,
          siteTitle: snapshot.val().siteTitle
        };
        dispatch(setSettings(settings));
      });
  };
};
