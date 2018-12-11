import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const EntryListItem = props => {
  const lastUpdatedUser = props.users.find(user => {
    return props.entry.lastUpdatedBy === user.uid;
  });
  const createdUser = props.users.find(user => {
    return props.entry.createdBy === user.uid;
  });
  return (
    <tr>
      <td className="entries-list__first-column">
        <Link to={`/entry/${props.contentType.apiKey}/edit/${props.entry.id}`}>
          <p className="list-item__title">{props.entry.title}</p>
        </Link>
      </td>
      <td>
        {moment(props.entry.lastUpdated).calendar()}
        {lastUpdatedUser && <span> by {lastUpdatedUser.displayName}</span>}
      </td>
      <td>{createdUser && createdUser.displayName}</td>
      <td>Published</td>
    </tr>
  );
};

export default EntryListItem;
