// Invite Codes Reducer

const inviteCodesReducerDefaultState = [];

export default (state = inviteCodesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_INVITE_CODE":
      return [...state, action.inviteCode];
    case "EDIT_INVITE_CODE":
      return state.map(inviteCode => {
        if (inviteCode._id === action.id) {
          return {
            ...inviteCode,
            ...action.updates
          };
        } else {
          return inviteCode;
        }
      });
    case "SET_INVITE_CODES":
      return action.inviteCodes;
    default:
      return state;
  }
};
