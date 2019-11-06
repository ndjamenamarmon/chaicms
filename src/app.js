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
import { startAddField } from "./actions/fields";
import { startAddContentType } from "./actions/contentTypes";
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
        const titleField = {
          name: "Title",
          apiKey: "title",
          type: "Short Text",
          display: "Single line",
          helpText: "",
          isRequired: true,
          isUnique: true
        };
        const pageContentField = {
          name: "Page Content",
          apiKey: "pageContent",
          type: "Long Text",
          display: "Markdown",
          helpText: "",
          isRequired: true,
          isUnique: false
        };
        const slugField = {
          name: "Slug",
          apiKey: "slug",
          type: "Short Text",
          display: "Slug",
          helpText: "",
          isRequired: true,
          isUnique: true
        };
        const dateField = {
          name: "Date",
          apiKey: "date",
          type: "Date and Time",
          display: "Date and Time AM/PM",
          helpText: "",
          isRequired: false,
          isUnique: false
        };
        const postContentField = {
          name: "Post Content",
          apiKey: "postContent",
          type: "Long Text",
          display: "Markdown",
          helpText: "",
          isRequired: true,
          isUnique: false
        };
        const tagsField = {
          name: "Tags",
          apiKey: "tags",
          type: "Reference",
          display: "Many References",
          helpText: "",
          isRequired: false,
          isUnique: false
        };
        const tagContentType = {
          title: "Tag",
          apiKey: "tag",
          fields: ["title", "slug"],
          titleField: "title"
        };
        const pageContentType = {
          title: "Page",
          apiKey: "page",
          fields: ["title", "slug", "pageContent"],
          titleField: "title"
        };
        const postContentType = {
          title: "Post",
          apiKey: "post",
          fields: ["title", "slug", "date", "postContent", "tags"],
          titleField: "title"
        };

        store.dispatch(startAddField(titleField));
        store.dispatch(startAddField(pageContentField));
        store.dispatch(startAddField(slugField));
        store.dispatch(startAddField(dateField));
        store.dispatch(startAddField(postContentField));
        store.dispatch(startAddField(tagsField));
        store.dispatch(startAddContentType(tagContentType));
        store.dispatch(startAddContentType(pageContentType));
        store.dispatch(startAddContentType(postContentType));

        renderApp();
        history.push("/");

        // Promise.all([
        //   store.dispatch(startAddField(titleField)),
        //   store.dispatch(startAddField(pageContentField)),
        //   store.dispatch(startAddField(slugField)),
        //   store.dispatch(startAddField(dateField)),
        //   store.dispatch(startAddField(postContentField)),
        //   store.dispatch(startAddField(tagsField)),
        //   store.dispatch(startAddContentType(tagContentType)),
        //   store.dispatch(startAddContentType(pageContentType)),
        //   store.dispatch(startAddContentType(postContentType))
        // ]).then(() => {
        //   renderApp();
        //   history.push("/");
        // });
      }
    });
  }
});
