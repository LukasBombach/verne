import Doc from './document/doc';
import Actions from './actions';

export default class WriteEditor {

  public doc: Doc = new Doc();
  public actions: Readonly<Actions> = new Actions(this);

  public static fromHtml(html: string): WriteEditor  {
    const doc = Doc.fromHtml(html);
    return new WriteEditor(doc);
  }

  public static fromElement(el: Element): WriteEditor {
    const doc = Doc.fromElement(el);
    return new WriteEditor(doc);
  }

  constructor(doc: Doc = new Doc()) {
    this.doc = doc;
  }
}
