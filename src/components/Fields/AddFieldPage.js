import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FieldForm from "./FieldForm.js";
import { startAddField, startSetFields } from "../../actions/fields";

export class AddFieldPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  async componentDidMount() {
    await this.props.startSetFields();
    this.setState({ loading: false });
  }

  onSubmit = field => {
    this.props.startAddField(field);
    this.props.history.push("/fields");
  };
  render() {
    return (
      <div>
        {!this.state.loading && (
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
        )}
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
  startAddField: field => dispatch(startAddField(field)),
  startSetFields: () => dispatch(startSetFields())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFieldPage);
