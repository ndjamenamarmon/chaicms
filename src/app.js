import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { startLogin } from "./actions/auth";
import { startSetPublicSettings, startEditSettings } from "./actions/settings";
// import { startAddUserRoles } from "./actions/userRoles";
import { startSetUser } from "./actions/user";
import { startAddUserRoles } from "./actions/userRoles";
import "normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";
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
  if (store.getState().auth.uid) {
    store.dispatch(startSetUser(store.getState().auth.uid)).then(() => {
      renderApp();
      if (history.location.pathname === "/") {
        history.push("/registration");
      }
    });
  } else {
    // store.dispatch(startAddUserRoles());
    store.dispatch(startSetPublicSettings()).then(() => {
      if (store.getState().settings.isSetup) {
        renderApp();
        history.push("/");
      } else {
        store.dispatch(startAddUserRoles());
        renderApp();
        history.push("/");
      }
    });
  }
});
