import Inline from './inline';

export default class Block {

  constructor() {
    this.inlines = [new Inline()];
  }

}
