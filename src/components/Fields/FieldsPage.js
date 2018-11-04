import React from "react";
import { Link } from "react-router-dom";
import FieldsList from "./FieldsList";

const FieldsPage = () => (
  <div>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Fields</h1>
        <div className="page-header__actions">
          <Link className="button" to="/fields/add">
            Add Field
          </Link>
        </div>
      </div>
    </div>
    <div className="content-container">
      <FieldsList />
    </div>
  </div>
);

export default FieldsPage;
