import React from "react";
import moment from "moment";

export default class FieldForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.field ? props.field.name : "",
      apiKey: props.field ? props.field.apiKey : "",
      apiKeyError: "",
      helpText: props.field ? props.field.helpText : "",
      type: props.field ? props.field.type : "",
      display: props.field ? props.field.display : "",
      isRequired: props.field ? props.field.isRequired : false,
      isUnique: props.field ? props.field.isUnique : false,
      error: ""
    };
  }

  useCamelify = string => {
    return string.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index == 0 ? match.toLowerCase() : match.toUpperCase();
    });
  };
  checkApiKey = apiKeyValue => {
    return this.props.fields.find(field => {
      return field.apiKey === apiKeyValue;
    });
  };
  onNameChange = e => {
    const name = e.target.value;
    let apiKey = this.useCamelify(name);

    // enforce uniqueness
    while (this.checkApiKey(apiKey)) {
      apiKey =
        apiKey +
        Math.round(Math.random() * (999999999 - 100000000) + 100000000);
    }

    this.setState(() => ({
      name,
      apiKey
    }));
  };
  onApiKeyChange = e => {
    // enforce no whitespace
    const apiKey = this.useCamelify(e.target.value);

    // enforce uniqueness
    const apiKeyExists = this.checkApiKey(apiKey);
    if (apiKeyExists) {
      this.setState(() => ({
        apiKeyError: "This API Key already exists."
      }));
    } else {
      this.setState(() => ({
        apiKeyError: ""
      }));
    }

    this.setState(() => ({
      apiKey
    }));
  };
  onHelpTextChange = e => {
    const helpText = e.target.value;
    this.setState(() => ({
      helpText
    }));
  };
  onTypeChange = e => {
    const type = e.target.value;
    this.setState(() => ({
      type
    }));
  };
  onDisplayChange = e => {
    const display = e.target.value;
    this.setState(() => ({
      display
    }));
  };
  onIsRequiredChange = e => {
    const isRequired = e.target.checked ? true : false;
    this.setState(() => ({
      isRequired
    }));
  };
  onIsUniqueChange = e => {
    const isUnique = e.target.checked ? true : false;
    this.setState(() => ({
      isUnique
    }));
  };
  onSubmit = e => {
    e.preventDefault();
    // TO DO: Check that apiKey/name is unique in db
    if (
      !this.state.name ||
      !this.state.apiKey ||
      !this.state.type ||
      !this.state.display ||
      this.state.apiKeyError
    ) {
      const error = "Please complete all required fields.";
      const success = "";
      this.setState(() => ({ error, success }));
    } else {
      const error = "";
      const success = "Field saved successfully.";
      this.setState(() => ({ error, success }));
      this.props.onSubmit({
        name: this.state.name,
        apiKey: this.state.apiKey,
        type: this.state.type,
        display: this.state.display,
        createdAt: this.props.field
          ? moment(this.props.field.createdAt).valueOf()
          : moment().valueOf(),
        lastUpdated: moment().valueOf(),
        helpText: this.state.helpText,
        isRequired: this.state.isRequired,
        isUnique: this.state.isUnique,
        createdBy: this.props.field
          ? this.props.field.createdBy
          : this.props.currentUser.uid,
        lastUpdatedBy: this.props.currentUser.uid
      });
    }
  };
  render() {
    return (
      <form
        className="form content-container--two-panel"
        onSubmit={this.onSubmit}
      >
        <div class="content-container__main-panel">
          <label className="label">
            Field Name <span className="fieldRequired">Required</span>
            <input
              className="text-input"
              type="text"
              autoFocus
              value={this.state.name}
              onChange={this.onNameChange}
            />
          </label>
          <label className="label">
            API Key <span className="fieldRequired">Required</span>
            <input
              className="text-input"
              type="text"
              value={this.state.apiKey}
              onChange={this.onApiKeyChange}
              readOnly={this.props.field}
            />
          </label>
          {this.state.apiKeyError && (
            <p className="form__error">{this.state.apiKeyError}</p>
          )}
          <label className="label">
            Help Text
            <input
              className="text-input"
              type="text"
              value={this.state.helpText}
              onChange={this.onHelpTextChange}
            />
            <span className="fieldHelpText">
              Help text will show up below the field on an entry form page
            </span>
          </label>
          <label className="label">
            Type of Field <span className="fieldRequired">Required</span>
            <select
              className="select select--fullWidth"
              value={this.state.type}
              onChange={this.onTypeChange}
              readOnly={this.props.field}
            >
              <option value="">Select...</option>
              <option value="Short Text">Short Text</option>
              <option value="Long Text">Long Text</option>
              <option value="Date and Time">Date and Time</option>
              {/* <option value="Number">Number</option>
          <option value="Location">Location</option>
          <option value="Media">Media</option>
          <option value="Boolean">Boolean</option> */}
              <option value="Reference">Reference</option>
            </select>
          </label>
          {this.state.type === "Short Text" && (
            <label className="label">
              Field Display <span className="fieldRequired">Required</span>
              <select
                className="select select--fullWidth"
                value={this.state.display}
                onChange={this.onDisplayChange}
              >
                <option value="">Choose how to display this field...</option>
                <option value="Single line">Single line</option>
                <option value="URL">URL</option>
                <option value="Slug">Slug</option>
              </select>
            </label>
          )}
          {this.state.type === "Long Text" && (
            <label className="label">
              Field Display <span className="fieldRequired">Required</span>
              <select
                className="select select--fullWidth"
                value={this.state.display}
                onChange={this.onDisplayChange}
              >
                <option value="">Choose how to display this field...</option>
                <option value="Multiple line">Multiple line</option>
                <option value="Markdown">Markdown</option>
                <option value="Rich HTML">Rich HTML</option>
              </select>
            </label>
          )}
          {this.state.type === "Date and Time" && (
            <label className="label">
              Field Display <span className="fieldRequired">Required</span>
              <select
                className="select select--fullWidth"
                value={this.state.display}
                onChange={this.onDisplayChange}
              >
                <option value="">Choose how to display this field...</option>
                <option value="Date only">Date only</option>
                <option value="Date and Time AM/PM">Date and Time AM/PM</option>
                <option value="Date and Time 24 Hour">
                  Date and Time 24 Hour
                </option>
              </select>
            </label>
          )}
          {this.state.type === "Reference" && (
            <label className="label">
              Field Display <span className="fieldRequired">Required</span>
              <select
                className="select select--fullWidth"
                value={this.state.display}
                onChange={this.onDisplayChange}
              >
                <option value="">Choose how to display this field...</option>
                <option value="One Reference">One Reference</option>
                <option value="Many References">Many References</option>
              </select>
            </label>
          )}
          <label className="label">
            <input
              type="checkbox"
              className="checkbox"
              value={this.state.isRequired}
              onChange={this.onIsRequiredChange}
              checked={this.state.isRequired}
            />{" "}
            Required field
          </label>
          <label className="label">
            <input
              type="checkbox"
              className="checkbox"
              value={this.state.isUnique}
              onChange={this.onIsUniqueChange}
              checked={this.state.isUnique}
            />{" "}
            Unique field
          </label>
        </div>
        <div class="content-container__action-panel">
          <button className="button action-panel__button">Save Field</button>
          {this.props.onRemove && (
            <button
              className="button button--secondary action-panel__button"
              onClick={this.props.onRemove}
            >
              Delete Field
            </button>
          )}
          {this.state.error && (
            <span className="form__error">{this.state.error}</span>
          )}
          {this.state.success && (
            <span className="form__success">{this.state.success}</span>
          )}
        </div>
      </form>
    );
  }
}
