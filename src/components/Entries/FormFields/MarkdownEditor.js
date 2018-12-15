import React, { Component } from "react";

import SimpleMDE from "react-simplemde-editor";
import "simplemde/dist/simplemde.min.css";

class MarkdownEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 1000,
      markdown: this.props.initialValue
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      markdown: value
    });
    this.props.onChange(value, this.props.name);
  }

  render() {
    return (
      <div>
        <SimpleMDE value={this.state.markdown} onChange={this.handleChange} />
      </div>
    );
  }
}

export default MarkdownEditor;
