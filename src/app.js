import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { startLogin, login, logout } from "./actions/auth";
import { startSetSettings } from "./actions/settings";
import { startSetContentTypes } from "./actions/contentTypes";
import { startSetFields } from "./actions/fields";
import { startSetEntries } from "./actions/entries";
import { startSetInviteCodes } from "./actions/inviteCodes";
import { startSetUsers } from "./actions/users";
import { startAddUserRoles, startSetUserRoles } from "./actions/userRoles";
import "normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";
import { firebase } from "./firebase/firebase";
import LoadingPage from "./components/LoadingPage";

if (process.env.THEME) {
  require(`./themes/${process.env.THEME}/styles.scss`);
} else {
  require("./themes/earl-grey/styles.scss");
}

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("app"));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById("app"));

store.dispatch(startLogin()).then(() => {
  console.log(store.getState().auth);
  if (store.getState().auth.uid) {
    store.dispatch(startSetUsers()).then(() => {
      renderApp();
      if (history.location.pathname === "/") {
        history.push("/registration");
      }
    });

    // store.dispatch(startAddUserRoles());

    // TO DO: Do not dispatch all this until the user is past the registration screen; ping the db api directly for checking the invite code
    // store.dispatch(startSetUsers()).then(() => {
    //   store.dispatch(startSetUserRoles()).then(() => {
    //     store.dispatch(startSetSettings()).then(() => {
    //       store.dispatch(startSetContentTypes()).then(() => {
    //         store.dispatch(startSetFields()).then(() => {
    //           store.dispatch(startSetEntries()).then(() => {
    //             store.dispatch(startSetInviteCodes()).then(() => {

    //             });
    //           });
    //         });
    //       });
    //     });
    //   });
    // });
  } else {
    store.dispatch(startAddUserRoles());
    // store.dispatch(logout());
    store.dispatch(startSetSettings()).then(() => {
      renderApp();
      history.push("/");
    });
  }
});

// firebase.auth().onAuthStateChanged(user => {
//   if (user) {
//     console.log(user);
//     store.dispatch(startAddUserRoles()).then(() => {
//       store.dispatch(
//         login(user.uid, user.displayName, user.email, user.photoURL)
//       );
//     });

//     // TO DO: Do not dispatch all this until the user is past the registration screen; ping the db api directly for checking the invite code
//     store.dispatch(startSetUsers()).then(() => {
//       store.dispatch(startSetSettings()).then(() => {
//         store.dispatch(startSetContentTypes()).then(() => {
//           store.dispatch(startSetFields()).then(() => {
//             store.dispatch(startSetEntries()).then(() => {
//               store.dispatch(startSetInviteCodes()).then(() => {
//                 renderApp();
//                 if (history.location.pathname === "/") {
//                   history.push("/registration");
//                 }
//               });
//             });
//           });
//         });
//       });
//     });
//   } else {
//     store.dispatch(startAddUserRoles());
//     store.dispatch(logout());
//     store.dispatch(startSetSettings()).then(() => {
//       renderApp();
//       history.push("/");
//     });
//   }
// });
