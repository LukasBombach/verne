import TextNode from "./text_node";

export default class BlockNode {

  private static nextNodeId = 0;

  public tagName: string;
  public parent: BlockNode;
  public children: Array<BlockNode|TextNode>;
  public id: number;

  constructor(tagName: string, parent: BlockNode = null, children: Array<BlockNode|TextNode> = []) {
    this.tagName = tagName;
    this.parent = parent;
    this.children = children.map(child => child.cloneWithParent(this));
    this.id = BlockNode.nextNodeId;
    BlockNode.nextNodeId += 1;
    Object.freeze(this);
  }

  cloneWithParent(parent: BlockNode): BlockNode {
    return new BlockNode(this.tagName, parent, this.children);
  }

}
