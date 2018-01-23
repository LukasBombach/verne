import WriteEditor from "../write_editor";
import SelectionJson from '../selection';

interface InputAction {
  type: string;
  selection: SelectionJson;
  key: string;
}

export default function (editor: WriteEditor): Function {
  return async (action: InputAction) => {
    const { key, selection: { focusNode: node, focusOffset: offset } } = action;
    editor.doc = await editor.doc.transform('insertText', { node, offset, key });
  }
}