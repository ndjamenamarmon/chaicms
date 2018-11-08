import React from "react";

export default class FieldForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.field ? props.field.name : "",
      apiKey: props.field ? props.field.apiKey : "",
      type: props.field ? props.field.type : "",
      display: props.field ? props.field.display : "",
      error: ""
    };
  }

  useCamelify = string => {
    return string.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index == 0 ? match.toLowerCase() : match.toUpperCase();
    });
  };
  onNameChange = e => {
    const name = e.target.value;
    const apiKey = this.useCamelify(name);
    this.setState(() => ({
      name,
      apiKey
    }));
  };
  onApiKeyChange = e => {
    const apiKey = e.target.value;
    this.setState(() => ({
      apiKey
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
  onSubmit = e => {
    e.preventDefault();
    // TO DO: Check that apiKey/name is unique in db
    if (!this.state.name || !this.state.type) {
      const error = "Please provide name and type";
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
        display: this.state.display
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
          placeholder="Name"
          autoFocus
          value={this.state.name}
          onChange={this.onNameChange}
        />
        <input
          className="text-input"
          type="text"
          placeholder="API Key"
          value={this.state.apiKey}
          onChange={this.onApiKeyChange}
        />
        <select
          className="select"
          value={this.state.type}
          onChange={this.onTypeChange}
        >
          <option value="">Select a type...</option>
          <option value="Short Text">Short Text</option>
          <option value="Long Text">Long Text</option>
          {/* <option value="Number">Number</option>
          <option value="Date and Time">Date and Time</option>
          <option value="Location">Location</option>
          <option value="Media">Media</option>
          <option value="Boolean">Boolean</option>
          <option value="Reference">Reference</option> */}
        </select>
        {this.state.type === "Short Text" && (
          <select
            className="select"
            value={this.state.display}
            onChange={this.onDisplayChange}
          >
            <option value="">Choose how to display this field...</option>
            <option value="Single line">Single line</option>
            <option value="URL">URL</option>
            <option value="Slug">Slug</option>
          </select>
        )}
        {this.state.type === "Long Text" && (
          <select
            className="select"
            value={this.state.display}
            onChange={this.onDisplayChange}
          >
            <option value="">Choose how to display this field...</option>
            <option value="Multiple line">Multiple line</option>
            <option value="Markdown">Markdown</option>
          </select>
        )}
        <input type="checkbox" /> Required field
        <input type="checkbox" /> Unique field
        <div>
          <button className="button">Save Field</button>
        </div>
      </form>
    );
  }
}
