import React from "react";
import { Link } from "react-router-dom";

const UserListItem = ({
  _id,
  displayName,
  email,
  photoURL,
  role,
  isApproved,
  userRoles
}) => {
  const roleDisplay = userRoles.filter(userRole => {
    if (userRole.name === role) {
      return userRole;
    }
    return false;
  })[0].displayName;
  return (
    <Link
      className="card-list-item card-list-item--no-space-between"
      to={`/users/edit/${_id}`}
    >
      <img src={photoURL} className="card-list-item__image" />
      <div>
        <h3 className="card-list-item__title">{displayName}</h3>
        <span className="card-list-item__sub-title">
          User role: {roleDisplay}
        </span>
        <br />
        <span className="card-list-item__sub-title">
          E-mail address: {email}
        </span>
        <br />
        <span className="card-list-item__sub-title">
          {isApproved ? "Approved" : "Not Approved"}
        </span>
      </div>
    </Link>
  );
};

export default UserListItem;
