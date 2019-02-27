import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FieldForm from "./FieldForm.js";
import { startAddField } from "../../actions/fields";

export class AddFieldPage extends React.Component {
  onSubmit = field => {
    this.props.startAddField(field);
    this.props.history.push("/fields");
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Field</h1>
            <Link className="page-header__actions" to={`/fields`}>
              &laquo; Back
            </Link>
          </div>
        </div>
        <div className="content-container">
          <FieldForm
            fields={this.props.fields}
            currentUser={this.props.currentUser}
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fields: state.fields,
    currentUser: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  startAddField: field => dispatch(startAddField(field))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFieldPage);
