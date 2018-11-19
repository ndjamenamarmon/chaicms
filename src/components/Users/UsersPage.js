import React from "react";
import { Link } from "react-router-dom";
import UsersList from "./UsersList";

const UsersPage = () => (
  <div>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Users</h1>
        <div className="page-header__actions">
          <Link className="button" to="/settings">
            Add User
          </Link>
        </div>
      </div>
    </div>
    <div className="content-container">
      <UsersList />
    </div>
  </div>
);

export default UsersPage;
