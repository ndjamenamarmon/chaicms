import uuid from "uuid";
import database from "../firebase/firebase";

// ADD_ENTRY
export const addEntry = entry => ({
  type: "ADD_ENTRY",
  entry
});

export const startAddEntry = (entryData = {}) => {
  return (dispatch, getState) => {
    const entry = entryData.entry;

    return database
      .ref(`entries`)
      .push(entry)
      .then(ref => {
        dispatch(
          addEntry({
            id: ref.key,
            ...entry
          })
        );
      });
  };
};

// REMOVE_ENTRY
export const removeEntry = ({ id } = {}) => ({
  type: "REMOVE_ENTRY",
  id
});

export const startRemoveEntry = ({ id } = {}) => {
  return (dispatch, getState) => {
    return database
      .ref(`entries/${id}`)
      .remove()
      .then(() => {
        dispatch(removeEntry({ id }));
      });
  };
};

// EDIT_ENTRY
export const editEntry = (id, updates) => ({
  type: "EDIT_ENTRY",
  id,
  updates
});

export const startEditEntry = (id, updates) => {
  return (dispatch, getState) => {
    return database
      .ref(`entries/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editEntry(id, updates));
      });
  };
};

// SET_ENTRIES
export const setEntries = entries => ({
  type: "SET_ENTRIES",
  entries
});

export const startSetEntries = () => {
  return (dispatch, getState) => {
    return database
      .ref(`entries`)
      .once("value")
      .then(snapshot => {
        const entries = [];
        snapshot.forEach(childSnapshot => {
          entries.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });

        dispatch(setEntries(entries));
      });
  };
};
