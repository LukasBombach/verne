export default class Inline {

  constructor() {
    this.text = '';
    this.attrs = [];
  }

  render() {
    return document.createTextNode(this.text);
  }

}
