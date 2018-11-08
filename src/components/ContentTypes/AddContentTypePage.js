import React from "react";
import { connect } from "react-redux";
import ContentTypeForm from "./ContentTypeForm.js";
import { startAddContentType } from "../../actions/contentTypes";
import selectContentTypes from "../../selectors/contentTypes";

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
          </div>
        </div>
        <div className="content-container content-container--centered">
          <ContentTypeForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lastContentType: selectContentTypes(state.contentTypes, {
      sortBy: "createdAt"
    })[0]
  };
};

const mapDispatchToProps = dispatch => ({
  startAddContentType: contentType => dispatch(startAddContentType(contentType))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContentTypePage);
