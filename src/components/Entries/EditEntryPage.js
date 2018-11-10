import React from "react";
import { connect } from "react-redux";
import EntryForm from "./EntryForm";
import { startEditEntry, startRemoveEntry } from "../../actions/entries";

export class EditEntryPage extends React.Component {
  onSubmit = entry => {
    this.props.startEditEntry(this.props.entry.id, entry.entry);
    // this.props.history.push(`/entry/edit/${this.props.entry.id}`);
  };
  onRemove = () => {
    this.props.startRemoveEntry({ id: this.props.entry.id });

    this.props.history.push(`/entry/${this.props.contentType.apiKey}`);
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">
              Edit {this.props.contentType.title}
            </h1>
          </div>
        </div>
        <div className="content-container content-container--centered">
          <EntryForm
            entry={this.props.entry}
            onSubmit={this.onSubmit}
            contentType={this.props.contentType}
            fields={this.props.fields}
          />
          <button className="button button--secondary" onClick={this.onRemove}>
            Delete Entry
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    entry: state.entries.find(entry => entry.id === props.match.params.id),
    contentType: state.contentTypes.find(
      contentType => contentType.apiKey === props.match.params.slug
    ),
    fields: state.fields
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  startEditEntry: (id, entry) => dispatch(startEditEntry(id, entry)),
  startRemoveEntry: data => dispatch(startRemoveEntry(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEntryPage);
