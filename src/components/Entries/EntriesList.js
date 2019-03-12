import React from "react";
import { connect } from "react-redux";
import EntryListItem from "./EntryListItem";
import selectEntries from "../../selectors/entries";

export const EntriesList = props => {
  return (
    <table className="entries-list">
      <thead>
        <tr>
          <th>Title</th>
          {props.display !== "referenceManager" && <th>Updated</th>}
          {props.display !== "referenceManager" && <th>Author</th>}
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {props.entries.length === 0 ? (
          <tr>
            <td colSpan="4">
              <span>No entries</span>
            </td>
          </tr>
        ) : (
          props.entries.map(entry => {
            const newProps = {
              entry,
              contentType: props.contentType,
              users: props.users,
              display: props.display ? props.display : "",
              type: props.type ? props.type : "",
              handleChange: props.handleChange,
              references: props.references
            };
            return <EntryListItem {...newProps} key={entry.id} />;
          })
        )}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state, props) => {
  return {
    entries: selectEntries(state.entries, props.contentType),
    users: state.users
  };
};

export default connect(mapStateToProps)(EntriesList);
