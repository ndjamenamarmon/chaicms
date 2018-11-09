import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { login, logout } from "./actions/auth";
import { startSetSettings } from "./actions/settings";
import { startSetContentTypes } from "./actions/contentTypes";
import { startSetFields } from "./actions/fields";
import { startSetEntries } from "./actions/entries";
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

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));

    store.dispatch(startSetSettings()).then(() => {
      store.dispatch(startSetContentTypes()).then(() => {
        store.dispatch(startSetFields()).then(() => {
          store.dispatch(startSetEntries()).then(() => {
            renderApp();
            if (history.location.pathname === "/") {
              history.push("/dashboard");
            }
          });
        });
      });
    });
  } else {
    store.dispatch(logout());
    store.dispatch(startSetSettings()).then(() => {
      renderApp();
      history.push("/");
    });
  }
});
