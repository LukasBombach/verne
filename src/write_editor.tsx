import Doc from './document/doc';
import Actions from './actions';

import inputActionHandler from './action_handlers/input';

export default class WriteEditor {

  public doc: Doc;
  public actions: Actions;

  public static fromHtml(html: string): WriteEditor  {
    const template = document.createElement('template');
    template.innerHTML = html;
    return WriteEditor.fromElement(template.content);
  }

  public static fromElement(el: Node): WriteEditor {
    const doc = Doc.fromElement(el);
    const writeEditor = new WriteEditor();
    writeEditor.doc = doc;
    return writeEditor;
  }

  constructor() {
    this.doc = new Doc([]);
    this.actions = new Actions(this);
    this.actions.registerActionHandler('input', inputActionHandler(this));
  }

}
