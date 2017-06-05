import Parser from './parser';

export default class Doc {

  static fromElement(el) {
    return new Doc(el, Parser.getChildrenFor(el));
  }

  constructor(el, nodes, domNodeMap) {
    this.el = el;
    this.nodes = nodes;
    this.domNodeMap = domNodeMap;
  }

  insertTextFromInputEvent(e) {

  }

}
