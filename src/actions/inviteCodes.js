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
  };
};
