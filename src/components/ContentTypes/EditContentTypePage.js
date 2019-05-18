import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ContentTypeForm from "./ContentTypeForm";
import {
  startEditContentType,
  startRemoveContentType,
  startSetContentTypes
} from "../../actions/contentTypes";
import { startSetFields } from "../../actions/fields";
import selectFields from "../../selectors/fields";

export class EditContentTypePage extends React.Component {
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
    this.props.startEditContentType(this.props.contentType._id, contentType);
    this.props.history.push("/content-types");
  };
  onRemove = () => {
    this.props.startRemoveContentType({ id: this.props.contentType._id });
    this.props.history.push("/content-types");
  };
  render() {
    return (
      <div>
        {!this.state.loading && (
          <div>
            <div className="page-header">
              <div className="content-container">
                <h1 className="page-header__title">Edit Content Type</h1>
                <Link className="page-header__actions" to={`/content-types`}>
                  &laquo; Back
                </Link>
              </div>
            </div>
            <div className="content-container">
              <ContentTypeForm
                contentType={this.props.contentType}
                contentTypes={this.props.contentTypes}
                fields={this.props.fields}
                currentUser={this.props.currentUser}
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
    contentType: state.contentTypes.find(
      contentType => contentType._id === props.match.params.id
    ),
    contentTypes: state.contentTypes,
    fields: selectFields(state.fields),
    currentUser: state.auth
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  startEditContentType: (id, contentType) =>
    dispatch(startEditContentType(id, contentType)),
  startRemoveContentType: data => dispatch(startRemoveContentType(data)),
  startSetContentTypes: () => dispatch(startSetContentTypes()),
  startSetFields: () => dispatch(startSetFields())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditContentTypePage);
