import { firebase, googleAuthProvider } from "../firebase/firebase";
import axios from "axios";

export const login = (uid, displayName, email, photoURL) => ({
  type: "LOGIN",
  uid,
  displayName,
  email,
  photoURL
});

export const startLogin = () => {
  return async dispatch => {
    console.log("startLogin was called");
    // return firebase.auth().signInWithPopup(googleAuthProvider);
    const res = await axios.get("/api/current_user");
    dispatch(
      login(
        res.data._id,
        res.data.displayName,
        res.data.email,
        res.data.photoURL
      )
    );
  };
};

export const logout = () => ({
  type: "LOGOUT"
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
