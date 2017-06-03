// import Doc from './document/doc';
import Parser from './document/parser';

export default class WriteEditor {

  constructor(el) {
    this.el = el;
    // this.doc = Doc.fromElement(el);
    console.log(Parser.parse(el));
    this.enableEditing(true);
  }

  enableEditing(editMode) {
    this.el.contentEditable = editMode ? 'true' : 'false';
  }

  focus() {
    this.el.focus();
  }

}
