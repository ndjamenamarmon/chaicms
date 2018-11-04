import React from "react";
import { Link } from "react-router-dom";
import ContentTypesList from "./ContentTypesList";

const ContentTypesPage = () => (
  <div>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Content Types</h1>
        <div className="page-header__actions">
          <Link className="button" to="/content-types/add">
            Add Content Type
          </Link>
        </div>
      </div>
    </div>
    <div className="content-container">
      <ContentTypesList />
    </div>
  </div>
);

export default ContentTypesPage;
