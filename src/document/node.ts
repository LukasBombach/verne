import WriteEditor from "../write_editor";

export default class Node {

  private static nextNodeId = 0;

  id: Readonly<number>;
  originId: Readonly<number>;

  private editor: WriteEditor;

  constructor(editor: WriteEditor, originId: number = null) {
    this.id = ++Node.nextNodeId;
    this.originId = originId || this.id;
    this.editor = editor;
  }

  children(): Node[] {
    return this.editor.doc.getChildrenForNode(this);
  }

}
