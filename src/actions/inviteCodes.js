import uuid from "uuid";
import database from "../firebase/firebase";

// ADD_INVITE_CODE
export const addInviteCode = inviteCode => ({
  type: "ADD_INVITE_CODE",
  inviteCode
});

export const startAddInviteCode = (inviteCodeData = {}) => {
  return (dispatch, getState) => {
    const { status = "enabled", code = uuid() } = inviteCodeData;
    const inviteCode = {
      status,
      code
    };

    return database
      .ref(`invite_codes`)
      .push(inviteCode)
      .then(ref => {
        dispatch(
          addInviteCode({
            id: ref.key,
            ...inviteCode
          })
        );
      });
  };
};

// EDIT_INVITE_CODE
export const editInviteCode = (id, updates) => ({
  type: "EDIT_INVITE_CODE",
  id,
  updates
});

export const startEditInviteCode = (id, updates) => {
  return (dispatch, getState) => {
    return database
      .ref(`invite_codes/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editInviteCode(id, updates));
      });
  };
};

// SET_INVITE_CODES
export const setInviteCodes = inviteCodes => ({
  type: "SET_INVITE_CODES",
  inviteCodes
});

export const startSetInviteCodes = () => {
  return (dispatch, getState) => {
    // get the role id of the current user (where auth.uid === user.uid)
    // fetch the role based on that id from the db
    // if that role is admin or owner, go ahead and populate the invite codes (otherwise, don't)
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
                    .ref(`invite_codes`)
                    .once("value")
                    .then(snapshot => {
                      const inviteCodes = [];
                      snapshot.forEach(childSnapshot => {
                        inviteCodes.push({
                          id: childSnapshot.key,
                          ...childSnapshot.val()
                        });
                      });
                      dispatch(setInviteCodes(inviteCodes));
                    });
                }
              });
          }
        });
      });
  };
};
