import React from 'react';
import ReactDOM from 'react-dom';
import Doc from './document/doc';
import WriteJsDoc from './renderers/react/doc';

export default class WriteEditor {

  constructor(el) {
    this.el = el;
    this.doc = Doc.fromElement(el);
    this.el.contentEditable = 'true';
    ReactDOM.render(<WriteJsDoc doc={this.doc} />, document.getElementById('render-area'));
    console.log(this.doc);
    // this.el.addEventListener('input', e => this.doc.insertTextFromInputEvent(e), false);
  }

  focus() {
    this.el.focus();
  }

}
