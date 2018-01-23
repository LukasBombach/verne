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
    this.children = children;
    this.children.forEach(child => child.dangerouslyMutateParent(this));
    this.id = ++BlockNode.nextNodeId;
  }

  replaceText(oldTextNode: TextNode, newTextNode: TextNode): BlockNode {
    // if (!(this.parent instanceof Doc)) throw new Error('Cloning BlockNode that does not have the Doc as its parent. This is dangerous, cloned BlockNodes down the tree must also update their parent');
    // todo parent should be doc not null
    if (this.parent !== null) throw new Error('Cloning BlockNode that does not have the Doc as its parent. This is dangerous, cloned BlockNodes down the tree must also update their parent');
    const children = this.children.slice(0);
    const index = children.indexOf(oldTextNode);
    children[index] = newTextNode;
    return new BlockNode(this.tagName, this.parent, children);
  }

  dangerouslyMutateParent(newParent: BlockNode): BlockNode {
    this.parent = newParent || null;
    return this;
  }

}
