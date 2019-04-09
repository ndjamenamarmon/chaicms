import React, { useState } from "react";
import Toggle from "react-toggle";

export const SettingsForm = props => {
  const [siteTitle, setSiteTitle] = useState(
    props.settings && props.settings.siteTitle ? props.settings.siteTitle : ""
  );
  const [siteDescription, setSiteDescription] = useState(
    props.settings && props.settings.siteDescription
      ? props.settings.siteDescription
      : ""
  );
  const [requireInviteCodes, setRequireInviteCodes] = useState(
    props.settings ? props.settings.requireInviteCodes : false
  );
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onSubmit = e => {
    e.preventDefault();

    if (!siteTitle) {
      const error = "Please provide site title";
      const success = "";
      setError(error);
      setSuccess(success);
    } else {
      const error = "";
      const success = "Settings saved successfully.";
      setError(error);
      setSuccess(success);
      props.onSubmit({
        ...props.settings,
        siteTitle,
        siteDescription,
        requireInviteCodes
      });
    }
  };
  return (
    <form className="form" onSubmit={onSubmit}>
      {error && <p className="form__error">{error}</p>}
      {success && <p className="form__success">{success}</p>}
      <input
        className="text-input"
        type="text"
        placeholder="Site title"
        autoFocus
        value={siteTitle}
        onChange={e => setSiteTitle(e.target.value)}
      />
      <input
        className="text-input"
        type="text"
        placeholder="Site description"
        value={siteDescription}
        onChange={e => setSiteDescription(e.target.value)}
      />
      <label>
        <Toggle
          aria-label="Require invite codes"
          defaultChecked={requireInviteCodes}
          icons={false}
          onChange={e => setRequireInviteCodes(e.target.checked)}
        />
        <span className="toggle-label">Require invite codes</span>
      </label>
      <div>
        <button className="button">Save Settings</button>
      </div>
    </form>
  );
  // }
};

export default SettingsForm;
