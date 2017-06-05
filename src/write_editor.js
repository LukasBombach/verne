import Doc from './document/doc';

export default class WriteEditor {

  constructor(el) {
    this.el = el;
    this.doc = Doc.fromElement(el);
    this.el.contentEditable = 'true';
    this.el.addEventListener('keydown', e => this.doc.insertTextFromInputEvent(e));
  }

  focus() {
    this.el.focus();
  }

}
