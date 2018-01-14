export default class TextNode {

  constructor(text = '', parent, attrs = []) {
    this.text = text;
    this.parent = parent;
    this.attrs = attrs;
    Object.freeze(this);
  }

  cloneWithParent(parent) {
    return new TextNode(this.text, parent, this.attrs);
  }

}
