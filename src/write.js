import Doc from './models/doc/doc';

export default class WriteEditor {

  constructor(el) {
    this.el = el;
    this.doc = Doc.fromElement(el);
    this.enableEditing(true);
  }

  enableEditing(editMode) {
    this.el.contentEditable = editMode ? 'true' : 'false';
  }

  focus() {
    this.el.focus();
  }

}
