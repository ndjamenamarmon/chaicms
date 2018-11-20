import React from "react";
import { connect } from "react-redux";

const DashboardPage = props => (
  <div>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Dashboard</h1>
      </div>
    </div>
    <div className="content-container">
      Welcome {props.currentUser.displayName}!
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    currentUser: state.users.find(user => {
      return user.uid === state.auth.uid;
    })
  };
};

export default connect(mapStateToProps)(DashboardPage);
