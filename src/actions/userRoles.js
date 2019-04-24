// import uuid from "uuid";
// import database from "../firebase/firebase";
import axios from "axios";

// ADD DEFAULT USER ROLES
export const startAddUserRoles = () => {
  return async dispatch => {
    const userRoles = [
      {
        name: "member",
        displayName: "Member",
        permissions: []
      },
      {
        name: "author",
        displayName: "Author",
        permissions: [
          "CREATE_ENTRIES",
          "READ_OWN_ENTRIES",
          "UPDATE_OWN_ENTRIES"
        ]
      },
      {
        name: "editor",
        displayName: "Editor",
        permissions: [
          "CREATE_ENTRIES",
          "READ_ENTRIES",
          "UPDATE_ENTRIES",
          "DELETE_ENTRIES"
        ]
      },
      {
        name: "developer",
        displayName: "Developer",
        permissions: [
          "READ_CONTENT_TYPES",
          "READ_ENTRIES",
          "READ_FIELDS",
          "READ_INVITE_CODES",
          "READ_USER_ROLES",
          "READ_USERS",
          "CREATE_CONTENT_TYPES",
          "DELETE_CONTENT_TYPES",
          "UPDATE_CONTENT_TYPES",
          "CREATE_FIELDS",
          "DELETE_FIELDS",
          "UPDATE_FIELDS",
          "CREATE_ENTRIES",
          "UPDATE_ENTRIES",
          "DELETE_ENTRIES"
        ]
      },
      {
        name: "admin",
        displayName: "Admin",
        permissions: [
          "READ_CONTENT_TYPES",
          "READ_ENTRIES",
          "READ_FIELDS",
          "READ_INVITE_CODES",
          "READ_USER_ROLES",
          "READ_USERS",
          "CREATE_CONTENT_TYPES",
          "DELETE_CONTENT_TYPES",
          "UPDATE_CONTENT_TYPES",
          "CREATE_FIELDS",
          "DELETE_FIELDS",
          "UPDATE_FIELDS",
          "CREATE_ENTRIES",
          "UPDATE_ENTRIES",
          "DELETE_ENTRIES",
          "UPDATE_SETTINGS",
          "UPDATE_USER_ROLES"
        ]
      },
      {
        name: "owner",
        displayName: "Owner",
        permissions: [
          "READ_CONTENT_TYPES",
          "READ_ENTRIES",
          "READ_FIELDS",
          "READ_INVITE_CODES",
          "READ_USER_ROLES",
          "READ_USERS",
          "CREATE_CONTENT_TYPES",
          "DELETE_CONTENT_TYPES",
          "UPDATE_CONTENT_TYPES",
          "CREATE_FIELDS",
          "DELETE_FIELDS",
          "UPDATE_FIELDS",
          "CREATE_ENTRIES",
          "UPDATE_ENTRIES",
          "DELETE_ENTRIES",
          "UPDATE_SETTINGS",
          "UPDATE_USER_ROLES"
        ]
      }
    ];
    const getUserRoles = await axios.get("/api/user_roles");
    if (getUserRoles.data.length === 0) {
      userRoles.map(userRole => {
        axios.post("/api/user_roles", userRole);
      });
    }
  };
  // return (dispatch, getState) => {
  //   const userRoles = [
  //     {
  //       name: "member"
  //     },
  //     {
  //       name: "author"
  //     },
  //     {
  //       name: "editor"
  //     },
  //     {
  //       name: "developer"
  //     },
  //     {
  //       name: "admin"
  //     },
  //     {
  //       name: "owner"
  //     }
  //   ];

  //   return database
  //     .ref(`user_roles`)
  //     .once("value")
  //     .then(snapshot => {
  //       const existingUserRoles = [];
  //       snapshot.forEach(childSnapshot => {
  //         existingUserRoles.push({
  //           id: childSnapshot.key,
  //           ...childSnapshot.val()
  //         });
  //       });

  //       return userRoles.map(userRole => {
  //         if (
  //           !existingUserRoles.find(existingUserRoles => {
  //             return existingUserRoles.name === userRole.name;
  //           })
  //         ) {
  //           database.ref(`user_roles`).push(userRole);
  //         }
  //       });
  //     });
  // };
};

export const setUserRoles = user_roles => ({
  type: "SET_USER_ROLES",
  user_roles
});

export const startSetUserRoles = () => {
  return async dispatch => {
    const res = await axios.get("/api/user_roles");
    dispatch(setUserRoles(res.data));
  };
};

// EDIT_USER_ROLE
export const editUserRole = updates => ({
  type: "EDIT_USER_ROLE",
  updates
});

export const startEditUserRole = updates => {
  return async dispatch => {
    console.log(updates);
    const res = await axios.put(`/api/user_roles/${updates._id}`, updates);
    dispatch(editUserRole(updates));
  };
};

// SET_USER_ROLE_ID
// export const setUserRoleId = userRole => ({
//   type: "SET_USER_ROLE_ID",
//   userRole
// });

// export const startSetUserRoleId = role => {
//   return (dispatch, getState) => {
//     return database
//       .ref(`user_roles`)
//       .once("value")
//       .then(snapshot => {
//         const userRole = [];
//         snapshot.forEach(childSnapshot => {
//           if (childSnapshot.val().name === role) {
//             userRole.push({
//               id: childSnapshot.key,
//               ...childSnapshot.val()
//             });
//             dispatch(setUserRoleId(userRole));
//           }
//         });
//       });
//   };
// };
