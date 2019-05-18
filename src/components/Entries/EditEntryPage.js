import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EntryForm from "./EntryForm";
import {
  startEditEntry,
  startRemoveEntry,
  startSetEntries
} from "../../actions/entries";
import { startSetContentTypes } from "../../actions/contentTypes";
import { startSetFields } from "../../actions/fields";

export class EditEntryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  async componentDidMount() {
    await this.props.startSetEntries();
    await this.props.startSetContentTypes();
    await this.props.startSetFields();
    this.setState({ loading: false });
  }

  onSubmit = entry => {
    this.props.startEditEntry(this.props.entry._id, entry.entry);
    // this.props.history.push(`/entry/edit/${this.props.entry.id}`);
  };
  onRemove = () => {
    this.props.startRemoveEntry({ id: this.props.entry._id });

    this.props.history.push(`/entry/${this.props.contentType.apiKey}`);
  };
  render() {
    return (
      <div>
        {!this.state.loading && this.props.contentType && (
          <div>
            <div className="page-header">
              <div className="content-container">
                <h1 className="page-header__title">
                  Edit {this.props.contentType.title}
                </h1>
                <Link
                  className="page-header__actions"
                  to={`/entry/${this.props.contentType.apiKey}`}
                >
                  &laquo; Back
                </Link>
              </div>
            </div>
            <div className="content-container">
              <EntryForm
                entry={this.props.entry}
                onSubmit={this.onSubmit}
                onRemove={this.onRemove}
                contentType={this.props.contentType}
                fields={this.props.fields}
                entries={this.props.entries}
                currentUser={this.props.currentUser}
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
    entry: state.entries.find(entry => entry._id === props.match.params.id),
    contentType: state.contentTypes.find(
      contentType => contentType.apiKey === props.match.params.slug
    ),
    fields: state.fields,
    entries: state.entries,
    currentUser: state.auth
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  startEditEntry: (id, entry) => dispatch(startEditEntry(id, entry)),
  startRemoveEntry: data => dispatch(startRemoveEntry(data)),
  startSetEntries: () => dispatch(startSetEntries()),
  startSetContentTypes: () => dispatch(startSetContentTypes()),
  startSetFields: () => dispatch(startSetFields())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEntryPage);
