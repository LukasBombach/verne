import Inline from './inline';

export default class Block {

  constructor() {
    this.tagName = 'p';
    this.inlines = [new Inline('Maecenas sed diam eget risus varius blandit sit amet non magna. Curabitur blandit tempus porttitor.')];
  }

  render() {
    const el = document.createElement(this.tagName);
    this.inlines.forEach(inline => el.appendChild(inline.render()));
    return el;
  }

}
