import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <Redirect to="/registration" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated:
    state.auth.uid &&
    state.users.find(user => {
      return user._id === state.auth.uid;
    })
      ? true
      : false
});

export default connect(mapStateToProps)(PublicRoute);
