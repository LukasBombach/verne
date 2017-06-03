export default class BlockNode {

  constructor(tagName, parent = null, children = []) {
    this.tagName = tagName;
    this.parent = parent;
    this.children = children.map(child => child.cloneWithParent(this));
  }

  cloneWithParent(parent) {
    return new BlockNode(this.tagName, parent, this.children);
  }

  render() {
    const el = document.createElement(this.tagName);
    this.children.forEach(child => el.appendChild(child.render()));
    return el;
  }

}
