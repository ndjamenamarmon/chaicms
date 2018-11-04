import React from "react";
import { connect } from "react-redux";
import ContentTypeForm from "./ContentTypeForm.js";
import { startAddContentType } from "../../actions/contentTypes";

export class AddContentTypePage extends React.Component {
  onSubmit = contentType => {
    this.props.startAddContentType(contentType);
    this.props.history.push("/content-types");
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

const mapDispatchToProps = dispatch => ({
  startAddContentType: contentType => dispatch(startAddContentType(contentType))
});

export default connect(
  undefined,
  mapDispatchToProps
)(AddContentTypePage);
