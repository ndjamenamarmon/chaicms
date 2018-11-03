// Settings Reducer

const settingsReducerDefaultState = [];

export default (state = settingsReducerDefaultState, action) => {
  switch (action.type) {
    case "EDIT_SETTINGS":
      return {
        ...state,
        ...action.updates
      };
    case "SET_SETTINGS":
      return action.settings;
    default:
      return state;
  }
};
