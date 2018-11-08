import React from "react";
import { connect } from "react-redux";
import ContentTypeForm from "./ContentTypeForm";
import {
  startEditContentType,
  startRemoveContentType
} from "../../actions/contentTypes";
import selectFields from "../../selectors/fields";

export class EditContentTypePage extends React.Component {
  onSubmit = contentType => {
    this.props.startEditContentType(this.props.contentType.id, contentType);
    this.props.history.push("/content-types");
  };
  onRemove = () => {
    this.props.startRemoveContentType({ id: this.props.contentType.id });
    this.props.history.push("/content-types");
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Content Type</h1>
          </div>
        </div>
        <div className="content-container content-container--centered">
          <ContentTypeForm
            contentType={this.props.contentType}
            fields={this.props.fields}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.onRemove}>
            Delete Content Type
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    contentType: state.contentTypes.find(
      contentType => contentType.id === props.match.params.id
    ),
    fields: selectFields(state.fields)
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  startEditContentType: (id, contentType) =>
    dispatch(startEditContentType(id, contentType)),
  startRemoveContentType: data => dispatch(startRemoveContentType(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditContentTypePage);
