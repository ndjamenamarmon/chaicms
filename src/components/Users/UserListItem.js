import React from "react";
import { Link } from "react-router-dom";

const UserListItem = ({
  id,
  displayName,
  email,
  photoURL,
  role,
  isApproved
}) => (
  <Link className="list-item list-item--no-space-between" to={`/users`}>
    <img src={photoURL} className="list-item__image" />
    <div>
      <h3 className="list-item__title">
        {displayName} ({role})
      </h3>
      <span className="list-item__sub-title">{email}</span>
    </div>
  </Link>
);

export default UserListItem;
