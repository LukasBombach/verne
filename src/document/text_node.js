export default class TextNode {

  constructor(text = '', parent, attrs = []) {
    this.text = text;
    this.parent = parent;
    this.attrs = attrs;
  }

  render() {
    return document.createTextNode(this.text);
  }

}
