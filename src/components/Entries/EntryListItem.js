import React from "react";
import { Link } from "react-router-dom";

const EntryListItem = entry => (
  <Link className="list-item" to={`/entry/edit/${entry.id}`}>
    <div>
      <h3 className="list-item__title">{entry.title}</h3>
      {/* <span className="list-item__sub-title">{slug}</span> */}
    </div>
    {/* <h3 className="list-item__data">{type}</h3> */}
  </Link>
);

export default EntryListItem;
