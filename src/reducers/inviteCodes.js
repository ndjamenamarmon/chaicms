// Invite Codes Reducer

const inviteCodesReducerDefaultState = [];

export default (state = inviteCodesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_INVITE_CODE":
      return [...state, action.inviteCode];
    case "SET_INVITE_CODES":
      return action.inviteCodes;
    default:
      return state;
  }
};
