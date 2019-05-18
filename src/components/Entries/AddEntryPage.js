import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EntryForm from "./EntryForm.js";
import { startAddEntry, startSetEntries } from "../../actions/entries";
// import selectContentTypes from "../../selectors/contentTypes";
import { startSetContentTypes } from "../../actions/contentTypes";
import { startSetFields } from "../../actions/fields";

export class AddEntryPage extends React.Component {
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
    this.props.startAddEntry(entry);
    this.props.history.push(`/entry/${this.props.contentType.apiKey}`);
  };
  emptyEntry = () => {
    let newEntry = {};
    this.props.contentType.fields.forEach(fieldType => {
      newEntry[fieldType] = "";
    });
    // TODO: Add today's date as the default value for publishDate
    return newEntry;
  };
  render() {
    // console.log(this.props.contentType);
    return (
      <div>
        {!this.state.loading && this.props.contentType && (
          <div>
            <div className="page-header">
              <div className="content-container">
                <h1 className="page-header__title">
                  Add {this.props.contentType.title}
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
                onSubmit={this.onSubmit}
                contentType={this.props.contentType}
                fields={this.props.fields}
                entries={this.props.entries}
                entry={this.emptyEntry}
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
    // contentTypes: selectContentTypes(state.contentTypes)
    contentType: state.contentTypes.find(
      contentType => contentType.apiKey === props.match.params.slug
    ),
    fields: state.fields,
    entries: state.entries,
    currentUser: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  startAddEntry: entry => dispatch(startAddEntry(entry)),
  startSetEntries: () => dispatch(startSetEntries()),
  startSetContentTypes: () => dispatch(startSetContentTypes()),
  startSetFields: () => dispatch(startSetFields())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEntryPage);
