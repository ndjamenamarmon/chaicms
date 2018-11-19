import React from "react";
import { connect } from "react-redux";
import UserListItem from "./UserListItem";
// import selectContentTypes from "../../selectors/contentTypes";

export const UsersList = props => (
  <div>
    <div className="list-header">
      <div>Users</div>
    </div>
    <div className="list-body">
      {props.users.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No users</span>
        </div>
      ) : (
        props.users.map(user => {
          return <UserListItem {...user} key={user.id} />;
        })
      )}
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(mapStateToProps)(UsersList);
