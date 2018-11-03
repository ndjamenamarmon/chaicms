import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => (
  <div className="sidebar">
    <ul className="sidebar-list">
      <li>
        <Link className="sidebar-list__link" to="/dashboard">
          Dashboard
        </Link>
      </li>
    </ul>
    <ul className="sidebar-list">
      <li className="sidebar-list__heading">
        <Link className="sidebar-list__link" to="/dashboard">
          Content Types
        </Link>
        <ul className="sidebar-list sidebar-list--second-level">
          <li>
            <Link className="sidebar-list__link" to="/dashboard">
              Create New
            </Link>
          </li>
        </ul>
      </li>
      <li>
        <Link className="sidebar-list__link" to="/dashboard">
          Categories
        </Link>
        <ul className="sidebar-list sidebar-list--second-level">
          <li>
            <Link className="sidebar-list__link" to="/dashboard">
              All Categories
            </Link>
          </li>
          <li>
            <Link className="sidebar-list__link" to="/dashboard">
              Add New
            </Link>
          </li>
        </ul>
      </li>
      <li>
        <Link className="sidebar-list__link" to="/dashboard">
          Media
        </Link>
        <ul className="sidebar-list sidebar-list--second-level">
          <li>
            <Link className="sidebar-list__link" to="/dashboard">
              All Media
            </Link>
          </li>
          <li>
            <Link className="sidebar-list__link" to="/dashboard">
              Add New
            </Link>
          </li>
        </ul>
      </li>
      <li>
        <Link className="sidebar-list__link" to="/dashboard">
          Menus
        </Link>
        <ul className="sidebar-list sidebar-list--second-level">
          <li>
            <Link className="sidebar-list__link" to="/dashboard">
              All Menus
            </Link>
          </li>
          <li>
            <Link className="sidebar-list__link" to="/dashboard">
              Add New
            </Link>
          </li>
        </ul>
      </li>
      <li>
        <Link className="sidebar-list__link" to="/dashboard">
          Pages
        </Link>
        <ul className="sidebar-list sidebar-list--second-level">
          <li>
            <Link className="sidebar-list__link" to="/dashboard">
              All Pages
            </Link>
          </li>
          <li>
            <Link className="sidebar-list__link" to="/dashboard">
              Add New
            </Link>
          </li>
        </ul>
      </li>
      <li>
        <Link className="sidebar-list__link" to="/dashboard">
          Posts
        </Link>
        <ul className="sidebar-list sidebar-list--second-level">
          <li>
            <Link className="sidebar-list__link" to="/dashboard">
              All Posts
            </Link>
          </li>
          <li>
            <Link className="sidebar-list__link" to="/dashboard">
              Add New
            </Link>
          </li>
        </ul>
      </li>
      <li>
        <Link className="sidebar-list__link" to="/dashboard">
          Tags
        </Link>
        <ul className="sidebar-list sidebar-list--second-level">
          <li>
            <Link className="sidebar-list__link" to="/dashboard">
              All Tags
            </Link>
          </li>
          <li>
            <Link className="sidebar-list__link" to="/dashboard">
              Add New
            </Link>
          </li>
        </ul>
      </li>
      <li>
        <Link className="sidebar-list__link" to="/dashboard">
          Users
        </Link>
        <ul className="sidebar-list sidebar-list--second-level">
          <li>
            <Link className="sidebar-list__link" to="/dashboard">
              All Users
            </Link>
          </li>
          <li>
            <Link className="sidebar-list__link" to="/dashboard">
              Add New
            </Link>
          </li>
        </ul>
      </li>
    </ul>

    <ul class="sidebar-list">
      <li>
        <Link className="sidebar-list__link" to="/dashboard">
          Themes
        </Link>
      </li>
      <li>
        <Link className="sidebar-list__link" to="/dashboard">
          Settings
        </Link>
      </li>
    </ul>
  </div>
);

export default Sidebar;
