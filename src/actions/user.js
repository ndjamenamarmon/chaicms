import axios from "axios";

// SET_USER
export const setUser = user => ({
  type: "SET_USER",
  user
});

export const startSetUser = id => {
  return async dispatch => {
    const res = await axios.get(`/api/users/${id}`);
    dispatch(setUser(res.data));
  };
};
