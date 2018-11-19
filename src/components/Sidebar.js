import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import selectContentTypes from "../selectors/contentTypes";
import { startLogout } from "../actions/auth";

export const Sidebar = props => (
  <Menu>
    <ul className="sidebar-list">
      <li>
        <NavLink className="sidebar-list__link" to="/dashboard">
          Dashboard
        </NavLink>
      </li>
    </ul>
    <ul className="sidebar-list">
      <li className="sidebar-list__heading">
        <NavLink className="sidebar-list__link" to="/content-types">
          Content Types
        </NavLink>
      </li>
    </ul>
    <ul className="sidebar-list">
      <li className="sidebar-list__heading">
        <NavLink className="sidebar-list__link" to="/fields">
          Fields
        </NavLink>
      </li>
    </ul>
    <ul className="sidebar-list">
      {props.contentTypes.map(contentType => {
        return (
          <li key={contentType.id}>
            <NavLink
              className="sidebar-list__link"
              to={`/entry/${contentType.apiKey}`}
            >
              {contentType.title}
            </NavLink>
          </li>
        );
      })}
    </ul>

    <ul className="sidebar-list">
      <li>
        <NavLink className="sidebar-list__link" to="/settings">
          Settings
        </NavLink>
      </li>
      <li>
        <NavLink className="sidebar-list__link" to="/users">
          Users
        </NavLink>
      </li>
      <li>
        <a href="#" className="sidebar-list__link" onClick={props.startLogout}>
          Logout
        </a>
      </li>
    </ul>
  </Menu>
);

const mapStateToProps = state => {
  return {
    contentTypes: selectContentTypes(state.contentTypes, { sortBy: "title" })
  };
};

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
