import React, { useState } from "react";
import Toggle from "react-toggle";

export const UserSettingsForm = props => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onSubmit = e => {
    e.preventDefault();
  };
  return (
    <form className="form" onSubmit={onSubmit}>
      {error && <p className="form__error">{error}</p>}
      {success && <p className="form__success">{success}</p>}

      <div className="invite-code">
        <span>Google</span>
        <label>
          <Toggle
            aria-label="Enable or disable this sign-in method"
            defaultChecked={true}
            icons={false}
            name={"google"}
            disabled={false}
            onChange={() => {
              console.log("toggled");
            }}
          />
        </label>
      </div>
    </form>
  );
  // }
};

export default UserSettingsForm;
