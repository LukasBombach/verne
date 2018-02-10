import Node from "./node";
import WriteEditor from "../write_editor";

interface CloneProperties {
  tagName?: string;
  parent?: Node;
  children?: Node[];
  originId?: number;
}

export default class Block extends Node {

  public tagName: Readonly<string>;

  constructor(editor: WriteEditor, tagName: string, originId?: number) {
    super(editor, originId);
    this.tagName = tagName;
  }

  clone(properties: CloneProperties = {}): Block {
    const tagName = properties.tagName || this.tagName;
    return new Block(this.editor, tagName, this.originId);
  }

}
