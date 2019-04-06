// import uuid from "uuid";
// import database from "../firebase/firebase";
import axios from "axios";

// ADD DEFAULT USER ROLES
export const startAddUserRoles = () => {
  return async dispatch => {
    const userRoles = [
      {
        name: "member"
      },
      {
        name: "author"
      },
      {
        name: "editor"
      },
      {
        name: "developer"
      },
      {
        name: "admin"
      },
      {
        name: "owner"
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
