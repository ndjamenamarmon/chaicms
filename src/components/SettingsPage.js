import React from "react";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SettingsForm from "./Settings/SettingsForm";
import InviteCodesForm from "./Settings/InviteCodesForm";
import UserSettingsForm from "./Settings/UserSettingsForm";
import UserRolesForm from "./Settings/UserRolesForm";
import { startEditSettings, startSetSettings } from "../actions/settings";
import { startEditUserRole, startSetUserRoles } from "../actions/userRoles";
import {
  startAddInviteCode,
  startEditInviteCode,
  startSetInviteCodes
} from "../actions/inviteCodes";

export class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  async componentDidMount() {
    await this.props.startSetSettings();
    await this.props.startSetInviteCodes();
    await this.props.startSetUserRoles();
    this.setState({ loading: false });
  }
  onSubmit = settings => {
    this.props.startEditSettings(settings);
  };
  onUserRolesSubmit = newUserRole => {
    this.props.startEditUserRole(newUserRole);
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
        {!this.state.loading && (
          <Tabs className="default-tabs">
            <TabList>
              <Tab>General Settings</Tab>
              {this.props.settings.requireInviteCodes && (
                <Tab>Invite Codes</Tab>
              )}
              <Tab>User Settings</Tab>
              <Tab>User Roles</Tab>
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
                <UserSettingsForm
                  settings={this.props.settings}
                  userRoles={this.props.userRoles}
                  onSubmit={this.onSubmit}
                />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="content-container content-container--centered">
                <UserRolesForm
                  settings={this.props.settings}
                  userRoles={this.props.userRoles}
                  onSubmit={this.onSubmit}
                  onUserRolesSubmit={this.onUserRolesSubmit}
                />
              </div>
            </TabPanel>
          </Tabs>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    settings: state.settings,
    inviteCodes: state.inviteCodes,
    userRoles: state.userRoles
  };
};

const mapDispatchToProps = dispatch => ({
  startEditSettings: settings => dispatch(startEditSettings(settings)),
  startEditUserRole: newUserRole => dispatch(startEditUserRole(newUserRole)),
  startAddInviteCode: () => dispatch(startAddInviteCode()),
  startEditInviteCode: (id, code) => dispatch(startEditInviteCode(id, code)),
  startSetSettings: () => dispatch(startSetSettings()),
  startSetInviteCodes: () => dispatch(startSetInviteCodes()),
  startSetUserRoles: () => dispatch(startSetUserRoles())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
