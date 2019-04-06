import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export const Header = ({ settings }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>{settings ? settings.siteTitle : "ChaiCMS"}</h1>
        </Link>
        <Link className="button button--link" to="/api/logout">
          Logout
        </Link>
      </div>
    </div>
  </header>
);

const mapStateToProps = (state, props) => {
  return {
    settings: state.settings
  };
};

export default connect(
  mapStateToProps,
  null
)(Header);
