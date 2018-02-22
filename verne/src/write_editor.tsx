import Doc from './document/doc';
import Actions from './actions';
import Node from "./document/node";

export default class WriteEditor {

  public doc: Doc = null;
  public actions: Readonly<Actions> = null;

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
    this.actions = new Actions(this);
    Node.editor = this;
  }
}
