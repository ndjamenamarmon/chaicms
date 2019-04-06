import React from "react";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SettingsForm from "./Settings/SettingsForm";
import InviteCodesForm from "./Settings/InviteCodesForm";
import UserSettingsForm from "./Settings/UserSettingsForm";
import { startEditSettings } from "../actions/settings";
import {
  startAddInviteCode,
  startEditInviteCode
} from "../actions/inviteCodes";

export class SettingsPage extends React.Component {
  onSubmit = settings => {
    this.props.startEditSettings(settings);
  };
  onGenerateInviteCode = () => {
    this.props.startAddInviteCode();
  };
  onEditInviteCode = code => {
    this.props.startEditInviteCode(code._id, code);
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h2 className="page-header__title">Settings</h2>
          </div>
        </div>

        <Tabs className="default-tabs">
          <TabList>
            <Tab>General Settings</Tab>
            {this.props.settings.requireInviteCodes && <Tab>Invite Codes</Tab>}
            <Tab>User Settings</Tab>
          </TabList>

          <TabPanel>
            <div className="content-container content-container--centered">
              <SettingsForm
                settings={this.props.settings}
                onSubmit={this.onSubmit}
              />
            </div>
          </TabPanel>
          {this.props.settings.requireInviteCodes && (
            <TabPanel>
              <div className="content-container content-container--centered">
                <InviteCodesForm
                  inviteCodes={this.props.inviteCodes}
                  onGenerateInviteCode={this.onGenerateInviteCode}
                  onEditInviteCode={this.onEditInviteCode}
                />
              </div>
            </TabPanel>
          )}
          <TabPanel>
            <div className="content-container content-container--centered">
              <h3>Authentication Methods</h3>
              <UserSettingsForm
                settings={this.props.settings}
                onSubmit={this.onSubmit}
              />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    settings: state.settings,
    inviteCodes: state.inviteCodes
  };
};

const mapDispatchToProps = dispatch => ({
  startEditSettings: settings => dispatch(startEditSettings(settings)),
  startAddInviteCode: () => dispatch(startAddInviteCode()),
  startEditInviteCode: (id, code) => dispatch(startEditInviteCode(id, code))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
