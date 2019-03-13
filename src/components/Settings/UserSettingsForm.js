import React, { useState } from "react";
import Toggle from "react-toggle";

export const UserSettingsForm = props => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [signInMethods, setSignInMethods] = useState(
    props.settings.signInMethods
      ? props.settings.signInMethods
      : [
          {
            type: "email",
            name: "Email / Password",
            enabled: false
          },
          {
            type: "phone",
            name: "Phone Number",
            enabled: false
          },
          {
            type: "google",
            name: "Google",
            enabled: true
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
      signInMethods: newSignInMethods
    });
  };
  const onSubmit = e => {
    e.preventDefault();
  };
  return (
    <form className="form" onSubmit={onSubmit}>
      {error && <p className="form__error">{error}</p>}
      {success && <p className="form__success">{success}</p>}

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
    </form>
  );
};

export default UserSettingsForm;
