import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import selectContentTypes from "../selectors/contentTypes";

export const Sidebar = props => (
  <div className="sidebar">
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
              to={`/entry/${contentType.slug}`}
            >
              {contentType.title}
            </NavLink>
          </li>
        );
      })}
    </ul>

    <ul className="sidebar-list">
      <li>
        <Link className="sidebar-list__link" to="/settings">
          Settings
        </Link>
      </li>
    </ul>
  </div>
);

const mapStateToProps = state => {
  return {
    contentTypes: selectContentTypes(state.contentTypes)
  };
};

export default connect(mapStateToProps)(Sidebar);
