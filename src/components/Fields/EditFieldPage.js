import React from "react";
import { connect } from "react-redux";
import FieldForm from "./FieldForm";
import { startEditField, startRemoveField } from "../../actions/fields";

export class EditFieldPage extends React.Component {
  onSubmit = field => {
    this.props.startEditField(this.props.field.id, field);
    this.props.history.push("/fields");
  };
  onRemove = () => {
    this.props.startRemoveField({ id: this.props.field.id });
    this.props.history.push("/fields");
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Field</h1>
          </div>
        </div>
        <div className="content-container">
          <FieldForm field={this.props.field} onSubmit={this.onSubmit} />
          <button className="button button--secondary" onClick={this.onRemove}>
            Delete Field
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    field: state.fields.find(field => field.id === props.match.params.id)
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  startEditField: (id, field) => dispatch(startEditField(id, field)),
  startRemoveField: data => dispatch(startRemoveField(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditFieldPage);
