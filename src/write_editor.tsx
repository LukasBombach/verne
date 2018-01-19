import * as React from "react";
import * as ReactDOM from "react-dom";
import Doc from './document/doc';
import WriteJsDoc from './io/react/components/doc';
import Events from './events';
import Actions from './actions';

export default class WriteEditor {

  private el: HTMLElement;
  private doc: Doc;
  private events: Events;
  private actions: Actions;

  constructor(el: HTMLElement) {
    this.el = el;
    this.doc = new Doc(this);
    this.events = new Events(this);
    this.actions = new Actions(this);
    this.el.contentEditable = 'true';
    this.events.listen();
    ReactDOM.render(<WriteJsDoc doc={this.doc} />, document.getElementById('render-area'));
  }

  getEl(): HTMLElement {
    return this.el;
  }

}
