export default class TextNode {

  static nextNodeId = 0;

  constructor(text = '', parent, attrs = []) {
    this.text = text;
    this.parent = parent;
    this.attrs = attrs;
    this.id = TextNode.nextNodeId;
    TextNode.nextNodeId += 1;
    Object.freeze(this);
  }

  cloneWithParent(parent) {
    return new TextNode(this.text, parent, this.attrs);
  }

}
