import React, { useState } from "react";

export const InviteCodesForm = props => {
  const [inviteCodes] = useState(props.inviteCodes);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const generateInviteCode = () => {
    props.onGenerateInviteCode();
  };
  const onSubmit = e => {
    e.preventDefault();
  };
  return (
    <form className="form" onSubmit={onSubmit}>
      {error && <p className="form__error">{error}</p>}
      {success && <p className="form__success">{success}</p>}
      {props.inviteCodes.map(inviteCode => {
        return <p key={inviteCode.id}>{inviteCode.id}</p>;
      })}
      <div>
        <button className="button" onClick={generateInviteCode}>
          Generate Invite Code
        </button>
      </div>
    </form>
  );
  // }
};

export default InviteCodesForm;
