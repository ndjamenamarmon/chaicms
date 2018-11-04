import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import DashboardPage from "../components/DashboardPage";
import LoginPage from "../components/LoginPage";
import NotFoundPage from "../components/NotFoundPage";
import SettingsPage from "../components/SettingsPage";
import ContentTypesPage from "../components/ContentTypes/ContentTypesPage";
import AddContentTypePage from "../components/ContentTypes/AddContentTypePage";
import EditContentTypePage from "../components/ContentTypes/EditContentTypePage";
import ContentPage from "../components/ContentPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
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
        <PrivateRoute path="/content/:slug" component={ContentPage} />
        <PrivateRoute path="/settings" component={SettingsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
