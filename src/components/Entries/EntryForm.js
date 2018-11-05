import React from "react";

export default class EntryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.entry ? props.entry.name : "",
      slug: props.entry ? props.entry.slug : "",
      type: props.entry ? props.entry.type : "",
      display: props.entry ? props.entry.display : "",
      error: ""
    };
  }
  useSlugify = string => {
    const a = "àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;";
    const b = "aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------";
    const p = new RegExp(a.split("").join("|"), "g");
    return string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, "-and-") // Replace & with ‘and’
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters
      .replace(/\-\-+/g, "-") // Replace multiple — with single -
      .replace(/^-+/, ""); // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
  };
  onNameChange = e => {
    const name = e.target.value;
    const slug = this.useSlugify(name);
    this.setState(() => ({
      name,
      slug
    }));
  };
  onSlugChange = e => {
    const slug = e.target.value;
    this.setState(() => ({
      slug
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
    // TO DO: Check that slug/name is unique in db
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
        slug: this.state.slug,
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
          placeholder="Slug"
          value={this.state.slug}
          onChange={this.onSlugChange}
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
