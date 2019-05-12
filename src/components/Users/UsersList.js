import React from "react";
import { connect } from "react-redux";
import UserListItem from "./UserListItem";
// import selectContentTypes from "../../selectors/contentTypes";

export const UsersList = props => (
  <div>
    <div className="card-list-header">
      <div>Users</div>
    </div>
    <div className="card-list-body card-list-body--two-columns">
      {props.users.length === 0 ? (
        <div className="card-list-item card-list-item--message">
          <span>No users</span>
        </div>
      ) : (
        props.users.map(user => {
          return (
            <UserListItem
              {...user}
              userRoles={props.userRoles}
              key={user._id}
            />
          );
        })
      )}
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    users: state.users,
    userRoles: state.userRoles
  };
};

export default connect(mapStateToProps)(UsersList);
