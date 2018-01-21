import BlockNode from "./block_node";

export default class TextNode {

  private static nextNodeId = 0;

  public text: string;
  public parent: BlockNode;
  public attrs: string[];
  public id: number;

  constructor(text: string = '', parent: BlockNode = null, attrs: string[] = []) {
    this.text = text;
    this.parent = parent;
    this.attrs = attrs;
    this.id = TextNode.nextNodeId;
    TextNode.nextNodeId += 1;
    Object.freeze(this);
  }

  cloneWithParent(parent: BlockNode): TextNode {
    return new TextNode(this.text, parent, this.attrs);
  }

  insertString(offset: number, str: string): TextNode {
    const text = this.text.substr(0, offset) + str + this.text.substr(offset);
    return new TextNode(text, null, this.attrs);
  }

}
