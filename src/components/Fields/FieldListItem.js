import React from "react";
import { Link } from "react-router-dom";

const FieldListItem = ({ _id, name, display, type }) => (
  <Link className="list-item" to={`/fields/edit/${_id}`}>
    <div>
      <h3 className="list-item__title">{name}</h3>
    </div>
    <div>
      <h3 className="list-item__data">{type}</h3>
      <span className="list-item__sub-data">{display}</span>
    </div>
  </Link>
);

export default FieldListItem;
