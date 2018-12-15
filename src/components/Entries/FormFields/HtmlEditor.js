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
    // let converter = new showdown.Converter();
    // showdown.setFlavor("github");
    // let initialValue = this.props.initialValue
    //   ? this.props.initialValue.replace("\n", "")
    //   : "";
    // console.log("initial value", initialValue);
    // initialValue = converter.makeHtml(initialValue);
    // console.log("initial value - html", initialValue);
    this.state = {
      html: this.props.initialValue
      // html: initialValue,
      // markdown: this.props.initialValue,
      // firstLoad: false
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleRawChange = this.handleRawChange.bind(this);
  }

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      // [{ header: 1 }, { header: 2 }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [
        ({ list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" })
      ],
      ["link", "image", "video"],
      ["clean"]
    ]
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video"
  ];

  handleChange(value) {
    // if (this.state.firstLoad !== false) {
    // let converter = new showdown.Converter();
    // const markdownValue = converter.makeMarkdown(value);

    this.setState({
      html: value
      // markdown: markdownValue,
      // firstLoad: true
    });
    this.props.onChange(value, this.props.name);
    // this.props.onChange(markdownValue, this.props.name);
    // this.props.onChange(this.state.markdown, this.props.name);
    // }
  }
  // handleRawChange(e) {
  //   let converter = new showdown.Converter();
  //   const value = e.target.value;
  //   const htmlValue = converter.makeHtml(value);

  //   this.setState({ html: htmlValue, markdown: value });
  //   this.props.onChange(value, this.props.name);
  //   // this.props.onChange(this.state.markdown, this.props.name);
  // }

  render() {
    return (
      <div>
        <ReactQuill
          value={this.state.html}
          onChange={this.handleChange}
          modules={this.modules}
          formats={this.formats}
        />

        {/* <textarea
          className="textarea"
          onChange={this.handleRawChange}
          value={this.state.markdown}
        /> */}
      </div>
    );
  }
}

export default MarkdownEditor;
