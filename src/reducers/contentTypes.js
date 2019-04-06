// Content Types Reducer

const contentTypesReducerDefaultState = [];

export default (state = contentTypesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_CONTENT_TYPE":
      return [...state, action.contentType];
    case "REMOVE_CONTENT_TYPE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_CONTENT_TYPE":
      return state.map(contentType => {
        if (contentType._id === action.id) {
          return {
            ...contentType,
            ...action.updates
          };
        } else {
          return contentType;
        }
      });
    case "SET_CONTENT_TYPES":
      return action.contentTypes;
    default:
      return state;
  }
};
