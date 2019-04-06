// Fields Reducer

const fieldsReducerDefaultState = [];

export default (state = fieldsReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_FIELD":
      return [...state, action.field];
    case "REMOVE_FIELD":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_FIELD":
      return state.map(field => {
        if (field._id === action.id) {
          return {
            ...field,
            ...action.updates
          };
        } else {
          return field;
        }
      });
    case "SET_FIELDS":
      return action.fields;
    default:
      return state;
  }
};
