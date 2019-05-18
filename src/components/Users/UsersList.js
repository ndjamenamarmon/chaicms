import React, { useEffect } from "react";
import { connect } from "react-redux";
import UserListItem from "./UserListItem";
import { startSetUsers } from "../../actions/users";
import { startSetUserRoles } from "../../actions/userRoles";

export const UsersList = props => {
  useEffect(async () => {
    await props.startSetUsers();
    await props.startSetUserRoles();
  }, []);
  return (
    <div>
      {props.users.length > 0 && props.userRoles.length > 0 && (
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
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    startSetUsers: () => dispatch(startSetUsers()),
    startSetUserRoles: () => dispatch(startSetUserRoles())
  };
};

const mapStateToProps = state => {
  return {
    users: state.users,
    userRoles: state.userRoles
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
