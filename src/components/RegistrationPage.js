import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";
import { startAddUser } from "../actions/users";
import { startEditInviteCode } from "../actions/inviteCodes";
import axios from "axios";

export const RegistrationPage = ({
  startLogin,
  startAddUser,
  startEditInviteCode,
  startSetUserRoleId,
  settings,
  users,
  auth,
  inviteCodes,
  history
}) => {
  const [registrationCheck, setRegistrationCheck] = useState(false);
  const [needInviteCodeEntry, setNeedInviteCodeEntry] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState(null);

  useEffect(async () => {
    setRegistrationCheck(true);
    if (!registrationCheck) {
      // this is to keep this code from running every time useEffect runs
      // Check if user is registered (exists in users object in db)
      const userExists = users.find(user => {
        return user._id === auth.uid;
      });
      if (userExists) {
        history.push("/dashboard");
      } else {
        // Check if invite codes are required - this needs to be coming directly from db, not redux store
        // let requireInviteCodes;
        const res = await axios.get("/api/settings");
        const requireInviteCodes = res.data.requireInviteCodes;
        // If invite codes are not required, register the user and log them in
        if (!requireInviteCodes) {
          startAddUser().then(() => {
            history.push("/dashboard");
          });
        } else {
          setNeedInviteCodeEntry(true);
          // If invite codes are required, check if the user has one (should come in through url, saved in sessionStorage, or can be entered by user on this screen)
          // If the user has an invite code and it is valid, register the user and log them in
        }
      }
    }
  });
  const onSubmit = async e => {
    e.preventDefault();

    // check if invite code is valid
    let inviteCodeExists = undefined;
    const res = await axios.get("/api/invite_codes");
    inviteCodeExists = res.data.filter(item => {
      if (item.code === inviteCode && item.status === "enabled") {
        return item;
      }
    });

    if (!inviteCode || !inviteCodeExists) {
      const error = "Please provide a valid invite code";
      setError(error);
    } else {
      const error = "";
      setError(error);
      // register user
      // expire invite code
      const updateInviteCode = { status: "expired" };
      const newUser = {
        googleId: auth.uid,
        displayName: auth.displayName,
        email: auth.email,
        photoURL: auth.photoURL,
        role: "member",
        isApproved: true
      };
      startAddUser(newUser).then(() => {
        startEditInviteCode(inviteCodeExists.id, updateInviteCode).then(() => {
          history.push("/dashboard");
        });
      });
    }
  };
  return (
    <div>
      {/* <Redirect to="/dashboard" /> */}
      {needInviteCodeEntry && (
        <div className="box-layout">
          <div className="box-layout__box">
            <h1 className="box-layout__title">Registration</h1>
            <p>An invite code is required to register.</p>
            <form className="form" onSubmit={onSubmit}>
              {error && <p className="form__error">{error}</p>}
              <input
                className="text-input"
                type="text"
                placeholder="Enter invite code"
                autoFocus
                value={inviteCode}
                onChange={e => setInviteCode(e.target.value)}
              />
              <div>
                <button className="button">Continue</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    settings: state.settings,
    users: state.users,
    auth: state.auth,
    inviteCodes: state.inviteCodes
  };
};

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin()),
  startAddUser: user => dispatch(startAddUser(user)),
  startEditInviteCode: (id, updates) =>
    dispatch(startEditInviteCode(id, updates))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationPage);
