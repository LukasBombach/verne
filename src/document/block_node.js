export default class BlockNode {

  static nextNodeId = 0;

  constructor(tagName, parent = null, children = []) {
    this.tagName = tagName;
    this.parent = parent;
    this.children = children.map(child => child.cloneWithParent(this));
    this.id = BlockNode.nextNodeId;
    BlockNode.nextNodeId += 1;
    Object.freeze(this);
  }

  cloneWithParent(parent) {
    return new BlockNode(this.tagName, parent, this.children);
  }

}
