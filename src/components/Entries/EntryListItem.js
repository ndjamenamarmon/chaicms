import React from "react";
import { Link } from "react-router-dom";

const EntryListItem = ({ id, name, slug, type }) => (
  <Link className="list-item" to={`/entries/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{name}</h3>
      <span className="list-item__sub-title">{slug}</span>
    </div>
    <h3 className="list-item__data">{type}</h3>
  </Link>
);

export default EntryListItem;
