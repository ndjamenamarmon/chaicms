import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { startSetUser } from "../actions/user";

export const PrivateRoute = ({
  // isAuthenticated,
  // userRole,
  auth,
  user,
  accessRole,
  component: Component,
  ...rest
}) => {
  let isAuthenticated, userRole;
  useEffect(async () => {
    await startSetUser(auth.uid);
  }, []);
  isAuthenticated = auth.uid && user && user._id === auth.uid ? true : false;
  userRole = user && user.role ? user.role : undefined;
  if (user.length !== 0) {
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
                // <Redirect to="/dashboard" />
                <p>redirect to dashboard</p>
              )}
            </div>
          ) : (
            // <Redirect to="/" />
            <p>redirect to home</p>
          )
        }
      />
    );
  } else {
    return null;
  }
};

const mapDispatchToProps = dispatch => ({
  startSetUser: id => dispatch(startSetUser(id))
});

const mapStateToProps = state => ({
  // userRole:
  //   state.auth.uid &&
  //   state.users.find(user => {
  //     return user._id === state.auth.uid;
  //   }).role,
  // isAuthenticated:
  //   state.auth.uid &&
  //   state.users.find(user => {
  //     return user._id === state.auth.uid;
  //   })
  //     ? true
  //     : false
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);
