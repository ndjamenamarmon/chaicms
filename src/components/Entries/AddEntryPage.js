import React from "react";
import { connect } from "react-redux";
import EntryForm from "./EntryForm.js";
import { startAddEntry } from "../../actions/entries";
// import selectContentTypes from "../../selectors/contentTypes";

export class AddEntryPage extends React.Component {
  onSubmit = entry => {
    this.props.startAddEntry(entry);
    this.props.history.push("/entries");
  };
  render() {
    console.log(this.props.contentType);
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">
              Add {this.props.contentType.title}
            </h1>
          </div>
        </div>
        <div className="content-container content-container--centered">
          <EntryForm
            onSubmit={this.onSubmit}
            contentType={this.props.contentType}
            fields={this.props.fields}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    // contentTypes: selectContentTypes(state.contentTypes)
    contentType: state.contentTypes.find(
      contentType => contentType.slug === props.match.params.slug
    ),
    fields: state.fields
  };
};

const mapDispatchToProps = dispatch => ({
  startAddEntry: entry => dispatch(startAddEntry(entry))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEntryPage);
