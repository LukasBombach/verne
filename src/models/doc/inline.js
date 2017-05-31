export default class Inline {

  constructor(text = '') {
    this.text = text;
    this.attrs = [];
  }

  render() {
    return document.createTextNode(this.text);
  }

}
