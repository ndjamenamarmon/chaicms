import React, { useEffect } from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";
import { startAddUser } from "../actions/users";

export const RegistrationPage = ({
  startLogin,
  startAddUser,
  settings,
  users,
  auth,
  history
}) => {
  useEffect(() => {
    // Check if user is registered (exists in users object in db)
    const userExists = users.find(user => {
      return user.uid === auth.uid;
    });
    if (userExists) {
      history.push("/dashboard");
    } else {
      // Check if invite codes are required
      const requireInviteCodes = settings.requireInviteCodes;
      // If invite codes are not required, register the user and log them in
      if (!requireInviteCodes) {
        const newUser = {
          uid: auth.uid
        };
        startAddUser(newUser).then(() => {
          history.push("/dashboard");
        });
      } else {
        // If invite codes are required, check if the user has one (should come in through url, saved in sessionStorage, or can be entered by user on this screen)
        // If the user has an invite code and it is valid, register the user and log them in
      }
    }
  });
  return <div>Enter invite code</div>;
};

const mapStateToProps = (state, props) => {
  return {
    settings: state.settings,
    users: state.users,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin()),
  startAddUser: user => dispatch(startAddUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationPage);
