// User Roles Reducer

const userRolesReducerDefaultState = [];

export default (state = userRolesReducerDefaultState, action) => {
  switch (action.type) {
    case "EDIT_USER_ROLE":
      return {
        ...state,
        ...action.updates
      };
    // case "SET_USER_ROLE_ID":
    //   return action.userRole;
    case "SET_USER_ROLES":
      return action.user_roles;
    default:
      return state;
  }
};
