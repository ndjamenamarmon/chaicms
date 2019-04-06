import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import selectContentTypes from "../selectors/contentTypes";
// import { startLogout } from "../actions/auth";

export const Sidebar = props => {
  return (
    <Menu>
      <ul className="sidebar-list">
        <li>
          <NavLink className="sidebar-list__link" to="/dashboard">
            Dashboard
          </NavLink>
        </li>
      </ul>
      {(props.userRole === "developer" ||
        props.userRole === "admin" ||
        props.userRole === "owner") && (
        <ul className="sidebar-list">
          <li className="sidebar-list__heading">
            <NavLink className="sidebar-list__link" to="/content-types">
              Content Types
            </NavLink>
          </li>
        </ul>
      )}
      {(props.userRole === "developer" ||
        props.userRole === "admin" ||
        props.userRole === "owner") && (
        <ul className="sidebar-list">
          <li className="sidebar-list__heading">
            <NavLink className="sidebar-list__link" to="/fields">
              Fields
            </NavLink>
          </li>
        </ul>
      )}

      {(props.userRole === "author" ||
        props.userRole === "editor" ||
        props.userRole === "developer" ||
        props.userRole === "admin" ||
        props.userRole === "owner") && (
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
      )}

      {(props.userRole === "admin" || props.userRole === "owner") && (
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
        </ul>
      )}

      <ul className="sidebar-list">
        <li>
          <Link href="#" className="sidebar-list__link" to="/api/logout">
            Logout
          </Link>
        </li>
      </ul>
    </Menu>
  );
};

const mapStateToProps = state => {
  return {
    contentTypes: selectContentTypes(state.contentTypes, { sortBy: "title" }),
    userRole:
      state.auth.uid &&
      state.users.find(user => {
        return user._id === state.auth.uid;
      }).role
  };
};

export default connect(
  mapStateToProps,
  null
)(Sidebar);
