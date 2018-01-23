import WriteEditor from "../write_editor";
import TextNode from "../document/text_node";

interface InputAction {
  type: string;
  node: TextNode;
  offset: number;
  key: string;
}

export default function (editor: WriteEditor): Function {
  return async (action: InputAction) => {
    const { node, offset, key } = action;
    editor.doc = await editor.doc.transform('insertText', { node, offset, key });
  }
}