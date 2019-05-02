import React, { useState } from "react";
import Toggle from "react-toggle";

export const UserSettingsForm = props => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [signInMethods, setSignInMethods] = useState(
    props.settings.signInMethods.length > 0
      ? props.settings.signInMethods
      : [
          {
            type: "email",
            name: "Email / Password",
            enabled: true
          },
          {
            type: "phone",
            name: "Phone Number",
            enabled: false
          },
          {
            type: "google",
            name: "Google",
            enabled: false
          },
          {
            type: "facebook",
            name: "Facebook",
            enabled: false
          },
          {
            type: "twitter",
            name: "Twitter",
            enabled: false
          },
          {
            type: "github",
            name: "GitHub",
            enabled: false
          }
        ]
  );
  const [defaultUserRole, setDefaultUserRole] = useState(
    props.settings && props.settings.defaultUserRole
      ? props.settings.defaultUserRole
      : "member"
  );

  const toggleSignInMethod = e => {
    const signInMethodToChange = e.target.name;
    let enabledStatus;
    if (e.target.checked) {
      enabledStatus = true;
    } else {
      enabledStatus = false;
    }

    let newSignInMethods = signInMethods.map(signInMethod => {
      if (signInMethod.type === signInMethodToChange) {
        signInMethod.enabled = enabledStatus;
      }
      return signInMethod;
    });
    setSignInMethods(newSignInMethods);

    props.onSubmit({
      ...props.settings,
      signInMethods: newSignInMethods
    });
  };
  const onSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      ...props.settings,
      signInMethods,
      defaultUserRole
    });
  };
  return (
    <form className="form" onSubmit={onSubmit}>
      {error && <p className="form__error">{error}</p>}
      {success && <p className="form__success">{success}</p>}

      <h3>Default User Settings</h3>
      <label className="label">
        User role for new sign-ups
        <select
          value={defaultUserRole}
          onChange={e => setDefaultUserRole(e.target.value)}
          className="select select--fullWidth"
        >
          {props.userRoles &&
            props.userRoles.map(userRole => {
              return (
                <option value={userRole.name} key={userRole._id}>
                  {userRole.displayName}
                </option>
              );
            })}
        </select>
      </label>

      <h3>Authentication Methods</h3>
      {signInMethods.map(signInMethod => {
        return (
          <div key={signInMethod.type} className="invite-code">
            <span>{signInMethod.name}</span>
            <label>
              <Toggle
                aria-label="Enable or disable this sign-in method"
                defaultChecked={signInMethod.enabled}
                icons={false}
                name={signInMethod.type}
                disabled={false}
                onChange={toggleSignInMethod}
              />
            </label>
          </div>
        );
      })}
      <div>
        <button className="button">Save Settings</button>
      </div>
    </form>
  );
};

export default UserSettingsForm;
