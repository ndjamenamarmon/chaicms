import React from "react";

export default class SettingsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      siteTitle: props.settings ? props.settings.siteTitle : "",
      siteDescription: props.settings ? props.settings.siteDescription : ""
    };
  }
  onSiteTitleChange = e => {
    const siteTitle = e.target.value;
    this.setState(() => ({
      siteTitle
    }));
  };
  onSiteDescriptionChange = e => {
    const siteDescription = e.target.value;
    this.setState(() => ({
      siteDescription
    }));
  };
  onSubmit = e => {
    e.preventDefault();

    if (!this.state.siteTitle) {
      const error = "Please provide site title";
      const success = "";
      this.setState(() => ({ error, success }));
    } else {
      const error = "";
      const success = "Settings saved successfully.";
      this.setState(() => ({ error, success }));
      this.props.onSubmit({
        siteTitle: this.state.siteTitle,
        siteDescription: this.state.siteDescription
      });
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        {this.state.success && (
          <p className="form__success">{this.state.success}</p>
        )}
        <input
          className="text-input"
          type="text"
          placeholder="Site title"
          autoFocus
          value={this.state.siteTitle}
          onChange={this.onSiteTitleChange}
        />
        <input
          className="text-input"
          type="text"
          placeholder="Site description"
          value={this.state.siteDescription}
          onChange={this.onSiteDescriptionChange}
        />
        <div>
          <button className="button">Save Settings</button>
        </div>
      </form>
    );
  }
}
