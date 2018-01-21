import Doc from './document/doc';
import Actions from './actions';

export default class WriteEditor {

  public doc: Doc;
  public actions: Actions;

  public static fromHtml(html: string): WriteEditor  {
    const template = document.createElement('template');
    template.innerHTML = html;
    return WriteEditor.fromEl(template.content);
  }

  public static fromEl(el: Node): WriteEditor {
    const doc = new Doc(el);
    const writeEditor = new WriteEditor();
    writeEditor.doc = doc;
    return writeEditor;
  }

  constructor() {
    this.doc = null;
    this.actions = new Actions(this);
  }

}
