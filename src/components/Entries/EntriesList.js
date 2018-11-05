import React from "react";
import { connect } from "react-redux";
import EntryListItem from "./EntryListItem";
import selectEntries from "../../selectors/entries";

export const EntriesList = props => (
  <div>
    <div className="list-header">
      <div className="show-for-mobile">Entries</div>
      <div className="show-for-desktop">Name</div>
      <div className="show-for-desktop">Type</div>
    </div>
    <div className="list-body">
      {props.entries.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No entries</span>
        </div>
      ) : (
        props.entries.map(field => {
          return <EntryListItem {...entry} key={entry.id} />;
        })
      )}
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    entries: selectEntries(state.entries)
  };
};

export default connect(mapStateToProps)(EntriesList);
