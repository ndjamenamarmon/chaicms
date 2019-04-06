import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export const PrivateRoute = ({
  isAuthenticated,
  userRole,
  accessRole,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={props =>
        isAuthenticated ? (
          <div>
            {accessRole.find(item => item === userRole) ? (
              <div>
                <Sidebar />
                <Header />
                <div className="main-container">
                  <div className="main-container__right">
                    <Component {...props} />
                  </div>
                </div>
              </div>
            ) : (
              <Redirect to="/dashboard" />
            )}
          </div>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  userRole:
    state.auth.uid &&
    state.users.find(user => {
      return user._id === state.auth.uid;
    }).role,
  isAuthenticated:
    state.auth.uid &&
    state.users.find(user => {
      return user._id === state.auth.uid;
    })
      ? true
      : false
});

export default connect(mapStateToProps)(PrivateRoute);
