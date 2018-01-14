export default class BlockNode {

  constructor(tagName, parent = null, children = []) {
    this.tagName = tagName;
    this.parent = parent;
    this.children = children.map(child => child.cloneWithParent(this));
    Object.freeze(this);
  }

  cloneWithParent(parent) {
    return new BlockNode(this.tagName, parent, this.children);
  }

}
