import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ContentTypeForm from "./ContentTypeForm.js";
import {
  startAddContentType,
  startSetContentTypes
} from "../../actions/contentTypes";
import { startSetFields } from "../../actions/fields";
import selectContentTypes from "../../selectors/contentTypes";
import selectFields from "../../selectors/fields";

export class AddContentTypePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  async componentDidMount() {
    await this.props.startSetContentTypes();
    await this.props.startSetFields();
    this.setState({ loading: false });
  }

  onSubmit = contentType => {
    this.props.startAddContentType(contentType).then(() => {
      this.props.history.push(
        `/content-types/edit/${this.props.lastContentType._id}`
      );
    });
  };
  render() {
    return (
      <div>
        {!this.state.loading && (
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
        )}
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
  startAddContentType: contentType =>
    dispatch(startAddContentType(contentType)),
  startSetContentTypes: () => dispatch(startSetContentTypes()),
  startSetFields: () => dispatch(startSetFields())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContentTypePage);
