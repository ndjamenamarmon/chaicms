import React, { useState, useEffect } from "react";

export const SettingsForm = props => {
  const [siteTitle, setSiteTitle] = useState(
    props.settings ? props.settings.siteTitle : ""
  );
  const [siteDescription, setSiteDescription] = useState(
    props.settings ? props.settings.siteDescription : ""
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
        siteTitle,
        siteDescription
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
      <div>
        <button className="button">Save Settings</button>
      </div>
    </form>
  );
  // }
};

export default SettingsForm;
