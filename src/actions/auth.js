import { firebase, googleAuthProvider } from "../firebase/firebase";

export const login = (uid, displayName, email, photoURL) => ({
  type: "LOGIN",
  uid,
  displayName,
  email,
  photoURL
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
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
