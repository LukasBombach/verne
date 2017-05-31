import Block from './block';

export default class Doc {

  static fromElement(el) {
    const doc = new Doc(el);
    doc.render();
    return doc;
  }

  constructor(el) {
    this.el = el;
    this.blocks = [new Block()];
  }

  render() {
    this.el.innerHTML = '';
    this.blocks.forEach(block => this.el.appendChild(block.render()));
  }

}
