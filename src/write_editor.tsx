import Doc from './document/doc';
import Actions from './actions';

export default class WriteEditor {

  public doc: Doc = new Doc();
  public actions: Actions = new Actions(this);

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

}
