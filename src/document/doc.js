import DomParser from './dom_parser';
// import InsertTextAction from '../actions/insert_text_action';

export default class Doc {

  static fromElement(el) {
    return new Doc(el, DomParser.getChildrenFor(el));
  }

  constructor(el, nodes = [], domNodeMap) {
    this.el = el;
    this.nodes = nodes;
    this.domNodeMap = domNodeMap;
  }

  // dispatchEvent(event) {
  //
  // }

  // insertTextFromInputEvent(e) {
  //   e.preventDefault();
  //   const insertTextAction = new InsertTextAction(e.data);
  //   this.dispatchEvent(insertTextAction);
  // }

}
