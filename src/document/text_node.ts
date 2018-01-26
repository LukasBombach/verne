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
    this.id = ++TextNode.nextNodeId;
  }

  insertString(offset: number, str: string): TextNode {
    const text = this.text.substr(0, offset) + str + this.text.substr(offset);
    return new TextNode(text, null, this.attrs);
  }

  precedes(that: TextNode): boolean {
    let parentNode: BlockNode|TextNode = this.parent;
    const thisIndex = this.getIndex();
    const thatIndex = that.getIndex();
    if (thatIndex !== -1) return thatIndex < thisIndex;
    while(parentNode = parentNode.prev()) {
      if (parentNode.hasChild(that)) return true;
    }
    return false;
  }

  getIndex(): number {
    return this.parent.indexOf(this);
  }

  prev(): BlockNode|TextNode {
    return this.parent.children[this.getIndex()];
  }

  hasChild(node: TextNode|BlockNode): boolean {
    return false;
  }

  dangerouslyMutateParent(newParent: BlockNode): TextNode {
    this.parent = newParent;
    return this;
  }

}
