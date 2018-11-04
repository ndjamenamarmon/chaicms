import React from "react";
import { Link } from "react-router-dom";

const ContentTypeListItem = ({ id, title, slug }) => (
  <Link className="list-item" to={`/content-types/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{title}</h3>
      <span className="list-item__sub-title">{slug}</span>
    </div>
    {/* <h3 className="list-item__data">{slug}</h3> */}
  </Link>
);

export default ContentTypeListItem;
