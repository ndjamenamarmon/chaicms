import React, { Component } from "react";
// import { EditorState, convertToRaw, ContentState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftToMarkdown from "draftjs-to-markdown";
// import { stateFromMarkdown } from "draft-js-import-markdown";

import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import showdown from "showdown";

class MarkdownEditor extends Component {
  constructor(props) {
    super(props);
    let converter = new showdown.Converter();
    showdown.setFlavor("github");
    this.state = {
      html: converter.makeHtml(this.props.initialValue),
      markdown: this.props.initialValue
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRawChange = this.handleRawChange.bind(this);
  }

  handleChange(value) {
    let converter = new showdown.Converter();
    const markdownValue = converter.makeMarkdown(value);

    this.setState({ html: value, markdown: markdownValue });
    this.props.onChange(markdownValue, this.props.name);
  }
  handleRawChange(e) {
    let converter = new showdown.Converter();
    const value = e.target.value;
    const htmlValue = converter.makeHtml(value);

    this.setState({ html: htmlValue, markdown: value });
    this.props.onChange(value, this.props.name);
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <ReactQuill value={this.state.html} onChange={this.handleChange} />
        {/* <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
        /> */}
        {/* <textarea
          disabled
          // value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          value={draftToMarkdown(convertToRaw(editorState.getCurrentContent()))}
        /> */}

        <textarea
          className="textarea"
          onChange={this.handleRawChange}
          value={this.state.markdown}
        />
      </div>
    );
  }
}

export default MarkdownEditor;
