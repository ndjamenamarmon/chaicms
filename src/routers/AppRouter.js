import React from "react";
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

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/registration" component={RegistrationPage} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute
          path="/content-types"
          component={ContentTypesPage}
          exact={true}
        />
        <PrivateRoute
          path="/content-types/add"
          component={AddContentTypePage}
        />
        <PrivateRoute
          path="/content-types/edit/:id"
          component={EditContentTypePage}
        />
        <PrivateRoute path="/fields" component={FieldsPage} exact={true} />
        <PrivateRoute path="/fields/add" component={AddFieldPage} />
        <PrivateRoute path="/fields/edit/:id" component={EditFieldPage} />
        <PrivateRoute
          path="/entry/:slug"
          component={EntriesPage}
          exact={true}
        />
        <PrivateRoute path="/entry/:slug/add" component={AddEntryPage} />
        <PrivateRoute path="/entry/:slug/edit/:id" component={EditEntryPage} />
        <PrivateRoute path="/settings" component={SettingsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
