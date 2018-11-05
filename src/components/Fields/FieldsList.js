import React from "react";
import { connect } from "react-redux";
import FieldListItem from "./FieldListItem";
import selectFields from "../../selectors/fields";

export const FieldsList = props => (
  <div>
    <div className="list-header">
      <div className="show-for-mobile">Fields</div>
      <div className="show-for-desktop">Name</div>
      <div className="show-for-desktop">Type</div>
    </div>
    <div className="list-body">
      {props.fields.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No fields</span>
        </div>
      ) : (
        props.fields.map(field => {
          return <FieldListItem {...field} key={field.id} />;
        })
      )}
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    fields: selectFields(state.fields)
  };
};

export default connect(mapStateToProps)(FieldsList);