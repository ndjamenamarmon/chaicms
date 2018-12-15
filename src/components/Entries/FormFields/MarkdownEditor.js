import React, { Component } from "react";
// import { EditorState, convertToRaw, ContentState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftToMarkdown from "draftjs-to-markdown";
// import { stateFromMarkdown } from "draft-js-import-markdown";

// import ReactQuill from "react-quill"; // ES6
// import "react-quill/dist/quill.snow.css"; // ES6
// import showdown from "showdown";

class MarkdownEditor extends Component {
  constructor(props) {
    super(props);
    // let converter = new showdown.Converter();
    // showdown.setFlavor("github");
    // let initialValue = this.props.initialValue.replace("\n", "");
    // console.log("initial value", initialValue);
    // initialValue = converter.makeHtml(initialValue);
    // console.log("initial value - html", initialValue);
    this.state = {
      markdown: this.props.initialValue
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleRawChange = this.handleRawChange.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({
      markdown: value
    });
    this.props.onChange(value, this.props.name);
  }

  render() {
    return (
      <div>
        <textarea
          className="textarea"
          onChange={this.handleChange}
          value={this.state.markdown}
        />
      </div>
    );
  }
}

export default MarkdownEditor;
