import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";
import draftToMarkdown from "draftjs-to-markdown";
import { stateFromMarkdown } from "draft-js-import-markdown";

class MarkdownEditor extends Component {
  state = {
    editorState: EditorState.createWithContent(
      stateFromMarkdown(this.props.initialValue)
    )
  };

  onEditorStateChange: Function = editorState => {
    this.setState({
      editorState
    });
    this.props.onChange(
      draftToMarkdown(convertToRaw(editorState.getCurrentContent())),
      this.props.name
    );
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <textarea
          disabled
          // value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          value={draftToMarkdown(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}

export default MarkdownEditor;
