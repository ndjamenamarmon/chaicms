import React from "react";

export default class ContentTypeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.contentType ? props.contentType.title : "",
      slug: props.contentType ? props.contentType.slug : "",
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
  onTitleChange = e => {
    const title = e.target.value;
    const slug = this.useSlugify(title);
    this.setState(() => ({
      title,
      slug
    }));
  };
  onSlugChange = e => {
    const slug = e.target.value;
    this.setState(() => ({
      slug
    }));
  };
  onSubmit = e => {
    e.preventDefault();
    // TO DO: Check that slug is unique in db
    if (!this.state.title || !this.state.slug) {
      const error = "Please provide title and slug";
      const success = "";
      this.setState(() => ({ error, success }));
    } else {
      const error = "";
      const success = "Content type saved successfully.";
      this.setState(() => ({ error, success }));
      this.props.onSubmit({
        title: this.state.title,
        slug: this.state.slug
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
          placeholder="Title"
          autoFocus
          value={this.state.title}
          onChange={this.onTitleChange}
        />
        <input
          className="text-input"
          type="text"
          placeholder="Slug"
          value={this.state.slug}
          onChange={this.onSlugChange}
        />
        <div>
          <button className="button">Save Content Type</button>
        </div>
      </form>
    );
  }
}
