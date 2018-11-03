import React from "react";
import { connect } from "react-redux";
import SettingsForm from "./SettingsForm";
import { startEditSettings } from "../actions/settings";

export class SettingsPage extends React.Component {
  onSubmit = settings => {
    this.props.startEditSettings(settings);
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
  startEditSettings: settings => dispatch(startEditSettings(settings))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
