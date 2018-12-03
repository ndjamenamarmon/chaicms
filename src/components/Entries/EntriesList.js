import React from "react";
import { connect } from "react-redux";
import EntryListItem from "./EntryListItem";
import selectEntries from "../../selectors/entries";

export const EntriesList = props => (
  <div>
    <div className="list-header">
      <div className="show-for-mobile">Entries</div>
      <div className="show-for-desktop">Title</div>
      {/* <div className="show-for-desktop">Type</div> */}
    </div>
    <div className="list-body">
      {props.entries.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No entries</span>
        </div>
      ) : (
        props.entries.map(entry => {
          const newProps = { entry, contentType: props.contentType };
          return <EntryListItem {...newProps} key={entry.id} />;
        })
      )}
    </div>
  </div>
);

const mapStateToProps = (state, props) => {
  return {
    entries: selectEntries(state.entries, props.contentType)
  };
};

export default connect(mapStateToProps)(EntriesList);
