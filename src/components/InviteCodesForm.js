import React, { useState } from "react";
import Toggle from "react-toggle";

export const InviteCodesForm = props => {
  const [inviteCodes] = useState(props.inviteCodes);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const toggleCode = e => {
    const codeId = e.target.name;
    let codeStatus;
    if (e.target.checked) {
      codeStatus = "enabled";
    } else {
      codeStatus = "disabled";
    }
    let inviteCode = inviteCodes.find(inviteCode => {
      return inviteCode.id === codeId;
    });
    inviteCode.status = codeStatus;
    props.onEditInviteCode(inviteCode);
  };
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
        return (
          <div key={inviteCode.id} className="invite-code">
            <span>
              {inviteCode.code}
              {inviteCode.status === "expired" && <span> (expired)</span>}
            </span>
            <label>
              <Toggle
                aria-label="Enable or disable this invite code"
                defaultChecked={inviteCode.status === "enabled"}
                icons={false}
                name={inviteCode.id}
                disabled={inviteCode.status === "expired"}
                onChange={toggleCode}
              />
            </label>
          </div>
        );
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
