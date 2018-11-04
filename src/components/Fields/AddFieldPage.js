import React from "react";
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
          </div>
        </div>
        <div className="content-container content-container--centered">
          <FieldForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddField: field => dispatch(startAddField(field))
});

export default connect(
  undefined,
  mapDispatchToProps
)(AddFieldPage);
