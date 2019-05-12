import axios from "axios";

// EDIT_USER
export const editUser = (id, updates) => ({
  type: "EDIT_USER",
  id,
  updates
});

export const startEditUser = (id, updates) => {
  return async dispatch => {
    const res = await axios.put(`/api/users/${id}`, updates);
    dispatch(editUser(id, updates));
  };
};

// SET_USERS
export const setUsers = users => ({
  type: "SET_USERS",
  users
});

export const startSetUsers = () => {
  return async (dispatch, getState) => {
    // need to only populate this with users if the role of the current user is admin or owner -> would break registration
    const res = await axios.get("/api/users");
    dispatch(setUsers(res.data));
  };
};

// REMOVE_USER
export const removeUser = ({ id } = {}) => ({
  type: "REMOVE_User",
  id
});

export const startRemoveUser = ({ id } = {}) => {
  return async dispatch => {
    const res = await axios.delete(`/api/users/${id}`);
    dispatch(removeUser(id));
  };
};
