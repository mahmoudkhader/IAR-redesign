// Import styles for the editor contents, and controls
import "./index.css";

import React, { Component } from "react";

// import PageContainer from "../../PageContainer";
import EditorAndConsoleContainer from "./EditorAndConsoleContainer";
import EditorComponent from "./EditorComponent";

// import MarkdownFileRenderer from "./MarkdownFileRenderer";

export default class RichEditorExampleTut extends Component {
  render() {
    return (
      //   <PageContainer {...this.props}>
      <div>
        <EditorAndConsoleContainer editorTitle={"Rich Text Editor"}>
          <EditorComponent />
        </EditorAndConsoleContainer>
      </div> //   </PageContainer>
    );
  }
}
