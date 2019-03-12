import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const EntryListItem = props => {
  const lastUpdatedUser = props.users.find(user => {
    return props.entry.lastUpdatedBy === user.uid;
  });
  const createdUser = props.users.find(user => {
    return props.entry.createdBy === user.uid;
  });
  const [references, setReferences] = useState(
    props.references ? props.references : []
  );
  const [reference, setReference] = useState(
    props.references ? props.references : ""
  );
  const onFieldChange = e => {
    const item = e.target.value;
    const value = e.target.checked ? e.target.value : null;
    const updatedReferences = props.handleChange(item, value);

    if (props.type === "many") {
      setReferences(updatedReferences);
    } else if (props.type === "one") {
      setReference(updatedReferences);
    }
  };
  return (
    <tr>
      <td className="entries-list__first-column">
        {props.contentType && (
          <Link
            to={`/entry/${props.contentType.apiKey}/edit/${props.entry.id}`}
          >
            <p className="list-item__title">{props.entry.title}</p>
          </Link>
        )}
        {props.display === "referenceManager" && props.type === "many" && (
          <label className="label">
            <input
              type="checkbox"
              className="checkbox"
              value={props.entry.id}
              onChange={onFieldChange}
              checked={references ? references.includes(props.entry.id) : false}
            />{" "}
            <span>{props.entry.title}</span>
          </label>
        )}
        {props.display === "referenceManager" && props.type === "one" && (
          <label className="label">
            <input
              type="radio"
              className="checkbox"
              value={props.entry.id}
              onChange={onFieldChange}
              checked={props.references === props.entry.id ? true : false}
            />{" "}
            <span>{props.entry.title}</span>
          </label>
        )}
      </td>
      {props.display !== "referenceManager" && (
        <td>
          {moment(props.entry.lastUpdated).calendar()}
          {lastUpdatedUser && <span> by {lastUpdatedUser.displayName}</span>}
        </td>
      )}
      {props.display !== "referenceManager" && (
        <td>{createdUser && createdUser.displayName}</td>
      )}
      <td>Published</td>
    </tr>
  );
};

export default EntryListItem;
