import uuid from "uuid";
import database from "../firebase/firebase";

// ADD_INVITE_CODE
export const addInviteCode = inviteCode => ({
  type: "ADD_INVITE_CODE",
  inviteCode
});

export const startAddInviteCode = (inviteCodeData = {}) => {
  return (dispatch, getState) => {
    const { status = "enabled" } = inviteCodeData;
    const inviteCode = {
      status
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
