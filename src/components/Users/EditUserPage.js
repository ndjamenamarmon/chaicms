import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import UserForm from "./UserForm";
import {
  startEditUser,
  startRemoveUser,
  startSetUsers
} from "../../actions/users";
import { startSetUserRoles } from "../../actions/userRoles";

export class EditUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  async componentDidMount() {
    await this.props.startSetUsers();
    await this.props.startSetUserRoles();
    this.setState({ loading: false });
  }
  onSubmit = user => {
    this.props.startEditUser(this.props.user._id, user);
    this.props.history.push("/users");
  };
  onRemove = () => {
    this.props.startRemoveUser({
      id: this.props.user._id
    });
    this.props.history.push("/users");
  };

  render() {
    return (
      <div>
        {!this.state.loading && this.props.user && (
          <div>
            <div className="page-header">
              <div className="content-container">
                <h1 className="page-header__title">Edit User</h1>
                <Link className="page-header__actions" to={`/users`}>
                  &laquo; Back
                </Link>
              </div>
            </div>
            <div className="content-container">
              <img
                src={this.props.user.photoURL}
                className="card-list-item__image"
              />
              <div>
                <h3 className="card-list-item__title">
                  {this.props.user.displayName}
                </h3>
                <span className="card-list-item__sub-title">
                  E-mail address: {this.props.user.email}
                </span>
              </div>

              <UserForm
                user={this.props.user}
                userRoles={this.props.userRoles}
                users={this.props.users}
                onSubmit={this.onSubmit}
                onRemove={this.onRemove}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: state.users.find(user => user._id === props.match.params.id),
    userRoles: state.userRoles,
    users: state.users
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  startEditUser: (id, user) => dispatch(startEditUser(id, user)),
  startRemoveUser: data => dispatch(startRemoveUser(data)),
  startSetUsers: () => dispatch(startSetUsers()),
  startSetUserRoles: () => dispatch(startSetUserRoles())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUserPage);
