import Doc from './document/doc';
import Actions from './actions';

import inputActionHandler from './action_handlers/input';

export default class WriteEditor {

  public doc: Doc = new Doc([]);
  public actions: Actions = new Actions(this);
  private onUpdateListeners: Function[] = [];

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
    this.actions.registerActionHandler('input', inputActionHandler(this));
  }

  public onUpdate(func: Function): WriteEditor {
    this.onUpdateListeners.push(func);
    return this;
  }

  public triggerUpdate() {
    for (const onUpdateListener of this.onUpdateListeners) {
      onUpdateListener(this.doc);
    }
  }

}
