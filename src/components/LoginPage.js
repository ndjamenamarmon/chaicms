import React, { useState, useReducer, useEffect } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
// import { startLogin } from "../actions/auth";
import { startEditSettings, startSetPublicSettings } from "../actions/settings";
import UserSettingsForm from "./Settings/UserSettingsForm";

Modal.setAppElement("#app");

export const LoginPage = ({
  startEditSettings,
  settings,
  startSetPublicSettings
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(async () => {
    await startSetPublicSettings();
  }, []);

  const onSubmit = settings => {
    startEditSettings(settings);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = e => {
    e.preventDefault();
    setModalIsOpen(false);
  };

  return (
    <div className="box-layout">
      {settings.length !== 0 && (
        <div>
          {settings.signInMethods.length === 0 && (
            <div className="box-layout__box">
              <h1 className="box-layout__title">Sign In Method Setup</h1>
              <UserSettingsForm settings={settings} onSubmit={onSubmit} />
            </div>
          )}
          {settings.signInMethods.length > 0 && (
            <div className="box-layout__box">
              <h1 className="box-layout__title">
                {settings ? settings.siteTitle : "ChaiCMS"}
              </h1>
              <p>{settings && settings.siteDescription}</p>
              {settings.signInMethods.map(signInMethod => {
                // if (signInMethod.enabled && signInMethod.type === "email") {
                //   return (
                //     <div key={signInMethod.type}>
                //       <button className="button" onClick={openModal}>
                //         Login with {signInMethod.name}
                //       </button>
                //       <Modal
                //         style={{
                //           overlay: {
                //             backgroundColor: "rgba(0, 0, 0, 0.75)",
                //             zIndex: 100
                //           }
                //         }}
                //         isOpen={modalIsOpen}
                //         onRequestClose={closeModal}
                //         contentLabel="Login Modal"
                //         closeTimeoutMS={200}
                //         className="modal"
                //       >
                //         <h3 className="modal__title">
                //           Register or Log In with Email and Password
                //         </h3>
                //         <div className="modal__body">
                //           <form className="form">
                //             <label className="label">
                //               E-mail Address
                //               <span className="fieldRequired">Required</span>
                //               <div>
                //                 <input type="text" className="text-input" />
                //               </div>
                //             </label>
                //             <label className="label">
                //               Password
                //               <span className="fieldRequired">Required</span>
                //               <div>
                //                 <input type="password" className="text-input" />
                //               </div>
                //             </label>
                //             <button className="button" onClick={closeModal}>
                //               Log In
                //             </button>{" "}
                //             <button
                //               className="button button--secondary"
                //               onClick={closeModal}
                //             >
                //               Cancel
                //             </button>
                //           </form>
                //         </div>
                //       </Modal>
                //     </div>
                //   );
                // }
                if (signInMethod.enabled && signInMethod.type !== "email") {
                  return (
                    <p key={signInMethod.type}>
                      <a className="button" href={`/auth/${signInMethod.type}`}>
                        Login with {signInMethod.name}
                      </a>
                    </p>
                  );
                }
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    settings: state.settings
  };
};

const mapDispatchToProps = dispatch => ({
  // startLogin: () => dispatch(startLogin()),
  startEditSettings: settings => dispatch(startEditSettings(settings)),
  startSetPublicSettings: settings => dispatch(startSetPublicSettings())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
