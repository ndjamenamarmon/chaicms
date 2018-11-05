import React from "react";
import { connect } from "react-redux";
import EntryForm from "./EntryForm.js";
import { startAddEntry } from "../../actions/entries";

export class AddEntryPage extends React.Component {
  onSubmit = entry => {
    this.props.startAddEntry(entry);
    this.props.history.push("/entries");
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Entry</h1>
          </div>
        </div>
        <div className="content-container content-container--centered">
          <EntryForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddEntry: entry => dispatch(startAddEntry(entry))
});

export default connect(
  undefined,
  mapDispatchToProps
)(AddEntryPage);
