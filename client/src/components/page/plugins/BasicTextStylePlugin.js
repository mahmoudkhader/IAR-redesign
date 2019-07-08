import { getDefaultKeyBinding, RichUtils } from "draft-js";

const BasicTextStylePlugin = {
  keyBindingFn(event) {
    return getDefaultKeyBinding(event);
  },

  handleKeyCommand(command, editorState, { getEditorState, setEditorState }) {
    // const editorState = getEditorState();
    const newEditorState = RichUtils.handleKeyCommand(editorState, command);
    if (newEditorState) {
      setEditorState(newEditorState);
      return "handled";
    }
    return "not-handled";
  }
};

export default BasicTextStylePlugin;
