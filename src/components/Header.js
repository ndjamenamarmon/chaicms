import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";

export const Header = ({ startLogout, settings }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>{settings ? settings.siteTitle : "ChaiCMS"}</h1>
        </Link>
        <button className="button button--link" onClick={startLogout}>
          Logout
        </button>
      </div>
    </div>
  </header>
);

const mapStateToProps = (state, props) => {
  return {
    settings: state.settings
  };
};

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
