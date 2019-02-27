import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ContentTypeForm from "./ContentTypeForm.js";
import { startAddContentType } from "../../actions/contentTypes";
import selectContentTypes from "../../selectors/contentTypes";
import selectFields from "../../selectors/fields";

export class AddContentTypePage extends React.Component {
  onSubmit = contentType => {
    this.props.startAddContentType(contentType).then(() => {
      this.props.history.push(
        `/content-types/edit/${this.props.lastContentType.id}`
      );
    });
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Content Type</h1>
            <Link className="page-header__actions" to={`/content-types`}>
              &laquo; Back
            </Link>
          </div>
        </div>
        <div className="content-container">
          <ContentTypeForm
            fields={this.props.fields}
            contentTypes={this.props.contentTypes}
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
    lastContentType: selectContentTypes(state.contentTypes, {
      sortBy: "createdAt"
    })[0],
    contentTypes: state.contentTypes,
    fields: selectFields(state.fields),
    currentUser: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  startAddContentType: contentType => dispatch(startAddContentType(contentType))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContentTypePage);
