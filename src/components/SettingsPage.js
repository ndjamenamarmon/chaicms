import React from "react";
import { connect } from "react-redux";
import SettingsForm from "./SettingsForm";
import { startEditSettings } from "../actions/settings";
import { startAddInviteCode } from "../actions/inviteCodes";

export class SettingsPage extends React.Component {
  onSubmit = settings => {
    this.props.startEditSettings(settings);
  };
  onGenerateInviteCode = () => {
    this.props.startAddInviteCode();
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Settings</h1>
          </div>
        </div>
        <div className="content-container content-container--centered">
          <SettingsForm
            settings={this.props.settings}
            onSubmit={this.onSubmit}
            onGenerateInviteCode={this.onGenerateInviteCode}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    settings: state.settings
  };
};

const mapDispatchToProps = dispatch => ({
  startEditSettings: settings => dispatch(startEditSettings(settings)),
  startAddInviteCode: () => dispatch(startAddInviteCode())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
