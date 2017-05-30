import Block from './block';

export default class Doc {

  static fromElement() {
    return new Doc();
  }

  constructor() {
    this.blocks = [new Block()];
  }

}
