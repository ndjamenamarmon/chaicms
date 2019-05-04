import React, { useState } from "react";
import Modal from "react-modal";
import Toggle from "react-toggle";

Modal.setAppElement("#app");

export const UserSettingsForm = props => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [signInMethods, setSignInMethods] = useState(
    props.settings.signInMethods.length > 0
      ? props.settings.signInMethods
      : [
          // {
          //   type: "email",
          //   name: "Email / Password",
          //   enabled: true
          // },
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentSignInMethod, setCurrentSignInMethod] = useState();
  const [newClientID, setNewClientID] = useState("");
  const [newClientSecret, setNewClientSecret] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModalAndSave = e => {
    e.preventDefault();

    let newSignInMethods = signInMethods.map(signInMethod => {
      if (signInMethod.type === currentSignInMethod) {
        signInMethod.enabled = true;
        signInMethod.clientID = newClientID;
        signInMethod.clientSecret = newClientSecret;
      }
      return signInMethod;
    });
    setSignInMethods(newSignInMethods);
    props.onSubmit({
      ...props.settings,
      signInMethods: newSignInMethods
    });

    setNewClientID("");
    setNewClientSecret("");
    setCurrentSignInMethod();
    setModalIsOpen(false);
  };

  const cancelModal = e => {
    e.preventDefault();

    let newSignInMethods = signInMethods.map(signInMethod => {
      if (signInMethod.type === currentSignInMethod) {
        signInMethod.enabled = false;
      }
      return signInMethod;
    });
    setSignInMethods(newSignInMethods);
    setCurrentSignInMethod();

    setModalIsOpen(false);
  };

  const toggleSignInMethod = e => {
    const signInMethodToChange = e.target.name;
    let enabledStatus;
    if (e.target.checked) {
      //enabledStatus = true;
      openModal();
      setCurrentSignInMethod(signInMethodToChange);
    } else {
      enabledStatus = false;
      setCurrentSignInMethod();

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
    }
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

      {props.userRoles && (
        <div>
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
        </div>
      )}

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
      {modalIsOpen && (
        <Modal
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              zIndex: 100
            }
          }}
          isOpen={modalIsOpen}
          onRequestClose={cancelModal}
          contentLabel="Sign In Method Keys"
          closeTimeoutMS={200}
          className="modal"
        >
          <h3 className="modal__title">Enter API Keys</h3>
          <div className="modal__body">
            <form className="form">
              <label className="label">
                Client ID
                <span className="fieldRequired">Required</span>
                <div>
                  <input
                    type="text"
                    className="text-input"
                    value={newClientID}
                    onChange={e => setNewClientID(e.target.value)}
                  />
                </div>
              </label>
              <label className="label">
                Client Secret
                <span className="fieldRequired">Required</span>
                <div>
                  <input
                    type="text"
                    className="text-input"
                    value={newClientSecret}
                    onChange={e => setNewClientSecret(e.target.value)}
                  />
                </div>
              </label>
              <button className="button" onClick={closeModalAndSave}>
                Save
              </button>{" "}
              <button
                className="button button--secondary"
                onClick={cancelModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </Modal>
      )}
      {/* <div>
        <button className="button">Save Settings</button>
      </div> */}
    </form>
  );
};

export default UserSettingsForm;
