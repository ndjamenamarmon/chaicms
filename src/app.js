import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { startLogin } from "./actions/auth";
import { startSetPublicSettings } from "./actions/settings";
import { startSetUsers } from "./actions/users";
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
    store.dispatch(startSetUsers()).then(() => {
      renderApp();
      if (history.location.pathname === "/") {
        history.push("/registration");
      }
    });
  } else {
    store.dispatch(startAddUserRoles());
    store.dispatch(startSetPublicSettings()).then(() => {
      renderApp();
      history.push("/");
    });
  }
});
