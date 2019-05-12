import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import DashboardPage from "../components/DashboardPage";
import LoginPage from "../components/LoginPage";
import RegistrationPage from "../components/RegistrationPage";
import NotFoundPage from "../components/NotFoundPage";
import SettingsPage from "../components/SettingsPage";

// Content Types
import ContentTypesPage from "../components/ContentTypes/ContentTypesPage";
import AddContentTypePage from "../components/ContentTypes/AddContentTypePage";
import EditContentTypePage from "../components/ContentTypes/EditContentTypePage";

// Fields
import FieldsPage from "../components/Fields/FieldsPage";
import AddFieldPage from "../components/Fields/AddFieldPage";
import EditFieldPage from "../components/Fields/EditFieldPage";

// Entries
import EntriesPage from "../components/Entries/EntriesPage";
import AddEntryPage from "../components/Entries/AddEntryPage";
import EditEntryPage from "../components/Entries/EditEntryPage";

// Users
import UsersPage from "../components/Users/UsersPage";
import EditUserPage from "../components/Users/EditUserPage";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import { startLogin } from "../actions/auth";

export const history = createHistory();

const AppRouter = props => {
  useEffect(() => {
    console.log("useEffect");
    props.startLogin();
  });
  return (
    <Router history={history}>
      <div>
        <Switch>
          <PublicRoute path="/" component={LoginPage} exact={true} />
          <Route path="/registration" component={RegistrationPage} />
          <PrivateRoute
            path="/dashboard"
            component={DashboardPage}
            accessRole={[
              "member",
              "author",
              "editor",
              "developer",
              "admin",
              "owner"
            ]}
          />
          <PrivateRoute
            path="/content-types"
            component={ContentTypesPage}
            exact={true}
            accessRole={["developer", "admin", "owner"]}
          />
          <PrivateRoute
            path="/content-types/add"
            component={AddContentTypePage}
            accessRole={["developer", "admin", "owner"]}
          />
          <PrivateRoute
            path="/content-types/edit/:id"
            component={EditContentTypePage}
            accessRole={["developer", "admin", "owner"]}
          />
          <PrivateRoute
            path="/fields"
            component={FieldsPage}
            exact={true}
            accessRole={["developer", "admin", "owner"]}
          />
          <PrivateRoute
            path="/fields/add"
            component={AddFieldPage}
            accessRole={["developer", "admin", "owner"]}
          />
          <PrivateRoute
            path="/fields/edit/:id"
            component={EditFieldPage}
            accessRole={["developer", "admin", "owner"]}
          />
          <PrivateRoute
            path="/entry/:slug"
            component={EntriesPage}
            exact={true}
            accessRole={["author", "editor", "developer", "admin", "owner"]}
          />
          <PrivateRoute
            path="/entry/:slug/add"
            component={AddEntryPage}
            accessRole={["author", "editor", "developer", "admin", "owner"]}
          />
          <PrivateRoute
            path="/entry/:slug/edit/:id"
            component={EditEntryPage}
            accessRole={["author", "editor", "developer", "admin", "owner"]}
          />
          <PrivateRoute
            path="/users"
            component={UsersPage}
            exact={true}
            accessRole={["admin", "owner"]}
          />
          <PrivateRoute
            path="/users/edit/:id"
            component={EditUserPage}
            accessRole={["admin", "owner"]}
          />
          <PrivateRoute
            path="/settings"
            component={SettingsPage}
            accessRole={["admin", "owner"]}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    startLogin: () => dispatch(startLogin())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AppRouter);
