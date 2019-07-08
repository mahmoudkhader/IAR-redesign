// import "./Draft.css";
// import "./PageForm.css";

import React, { Component } from "react";
import "medium-draft/lib/index.css";
import mediumDraftExporter from "medium-draft/lib/exporter";

// import { EditorState } from "draft-js";
// import Editor from "draft-js-plugins-editor";
// import BasicTextStylePlugin from "./plugins/BasicTextStylePlugin";
// import AddLinkPlugin from "./plugins/AddLinkPlugin";
import { Editor, createEditorState, BLOCK_BUTTONS } from "medium-draft";

const blockButtons = [
  {
    label: "H1",
    style: "header-one",
    icon: "header",
    description: "Heading 1"
  },
  {
    label: "H2",
    style: "header-two",
    icon: "header",
    description: "Heading 2"
  }
].concat(BLOCK_BUTTONS);

class PageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorState() // for empty content
    };
    /*
    this.state = {
      editorState: createEditorState(data), // with content
    };
    */

    this.onChange = editorState => {
      this.setState({ editorState });
    };

    this.refsEditor = React.createRef();
  }

  componentDidMount() {
    this.refsEditor.current.focus();
  }

  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       editorState: EditorState.createEmpty()
  //     };

  //     /* Create an array of plugins to be passed to `Editor` */
  //     this.plugins = [AddLinkPlugin, BasicTextStylePlugin];
  //   }

  //   componentDidMount() {
  //     this.focus();
  //   }

  //   onChange = editorState => {
  //     if (editorState.getDecorator() !== null) {
  //       this.setState({
  //         editorState
  //       });
  //     }
  //   };

  //   focus = () => {
  //     this.editor.focus();
  //   };
  render() {
    const { editorState } = this.state;
    return (
      <div
        className="editor"
        //   onClick={this.focus}
      >
        {/* <Editor
          editorState={editorState}
          onChange={this.onChange}
          plugins={this.plugins} // Pass the plugins to the Editor
          ref={element => {
            this.editor = element;
          }}
          placeholder="Tell your story"
          spellCheck
        /> */}
        <Editor
          ref={this.refsEditor}
          editorState={editorState}
          onChange={this.onChange}
          blockButtons={blockButtons}
        />
      </div>
    );
  }
}

export default PageForm;
