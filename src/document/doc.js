export default class Doc {

  constructor(el, nodes) {
    this.el = el;
    this.nodes = nodes;
  }

  render() {
    this.el.innerHTML = '';
    this.nodes.forEach(block => this.el.appendChild(block.render()));
  }

}
