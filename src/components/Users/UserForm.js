import React, { useState } from "react";

export const UserForm = props => {
  const [role, setRole] = useState(props.user && props.user.role);
  const [isApproved, setIsApproved] = useState(
    props.user && props.user.isApproved
  );

  const changeRole = e => {
    // TODO
    // check that the original role is not owner; if it isn't, go ahead and change the role
    // if the original role is owner, search database to ensure there is at least one other owner with isApproved == true; if so, go ahead and change the role
    // if there isn't at least one other owner who is approved, throw an error and don't change the role
    setRole(e.target.value);
  };
  const changeApproval = e => {
    // TODO
    // check that the original role is not owner; if it isn't, go ahead and change the role
    // if the original role is owner, search database to ensure there is at least one other owner with isApproved == true; if so, go ahead and change the role
    // if there isn't at least one other owner who is approved, throw an error and don't change the role
    setIsApproved(!e.target.checked);
  };
  const onSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      role,
      isApproved
    });
  };
  return (
    <form className="form content-container--two-panel" onSubmit={onSubmit}>
      <div className="content-container__main-panel">
        <label className="label">
          User Role
          <br />
          <select className="select" value={role} onChange={changeRole}>
            {props.userRoles &&
              props.userRoles.map(userRole => {
                return (
                  <option value={userRole.name} key={userRole.name}>
                    {userRole.displayName}
                  </option>
                );
              })}
          </select>
        </label>
        <label className="label">
          <input
            type="radio"
            className="checkbox"
            checked={isApproved}
            onChange={e => setIsApproved(e.target.checked)}
          />
          <span> Approved</span>
        </label>
        <label className="label">
          <input
            type="radio"
            className="checkbox"
            checked={!isApproved}
            onChange={changeApproval}
          />
          <span> Not Approved</span>
        </label>
        <button className="button">Save Changes</button>{" "}
        <button className="button button--secondary" onClick={props.onRemove}>
          Delete User
        </button>
      </div>
    </form>
  );
};

export default UserForm;
