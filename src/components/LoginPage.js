import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const LoginPage = ({ startLogin, settings }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">
        {settings ? settings.siteTitle : "ChaiCMS"}
      </h1>
      <p>{settings && settings.siteDescription}</p>
      {settings.signInMethods.map(signInMethod => {
        if (signInMethod.enabled) {
          return (
            <p>
              <a className="button" href={`/auth/${signInMethod.type}`}>
                Login with {signInMethod.name}
              </a>
            </p>
          );
        }
      })}
    </div>
  </div>
);

const mapStateToProps = (state, props) => {
  return {
    settings: state.settings
  };
};

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
