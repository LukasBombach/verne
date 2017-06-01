import BlockNode from './block_node';

export default class Doc {

  static fromElement(el) {
    const doc = new Doc(el);
    doc.render();
    return doc;
  }

  constructor(el) {
    this.el = el;
    this.blocks = [new BlockNode()];
  }

  render() {
    this.el.innerHTML = '';
    this.blocks.forEach(block => this.el.appendChild(block.render()));
  }

}
