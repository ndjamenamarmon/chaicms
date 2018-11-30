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
    // need to populate with more settings based on role; admin and owner can see everything
    return database
      .ref(`users`)
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          if (childSnapshot.val().uid === getState().auth.uid) {
            const roleId = childSnapshot.val().roleId;

            return database
              .ref(`user_roles/${roleId}`)
              .once("value")
              .then(snapshot => {
                const role = snapshot.val().name;

                if (role === "admin" || role === "owner") {
                  return database
                    .ref("settings")
                    .once("value")
                    .then(snapshot => {
                      const settings = snapshot.val();
                      dispatch(setSettings(settings));
                    });
                } else {
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
                }
              });
          }
        });
      });
  };
};
