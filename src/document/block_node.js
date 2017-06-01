export default class BlockNode {

  constructor(tagName, parent = null, children = []) {
    this.tagName = tagName;
    this.parent = parent;
    this.children = children;
  }

  render() {
    const el = document.createElement(this.tagName);
    this.children.forEach(child => el.appendChild(child.render()));
    return el;
  }

  setChildren(children = []) {
    this.children = children;
    return this;
  }

}
