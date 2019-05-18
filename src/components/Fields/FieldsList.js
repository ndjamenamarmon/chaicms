import React, { useEffect } from "react";
import { connect } from "react-redux";
import FieldListItem from "./FieldListItem";
import selectFields from "../../selectors/fields";
import { startSetFields } from "../../actions/fields";

export const FieldsList = props => {
  useEffect(async () => {
    await props.startSetFields();
  }, []);
  return (
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
            return <FieldListItem {...field} key={field._id} />;
          })
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    startSetFields: () => dispatch(startSetFields())
  };
};

const mapStateToProps = state => {
  return {
    fields: selectFields(state.fields)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldsList);
