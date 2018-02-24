import Doc from './document/doc';
import Actions from './actions';
import Node from "./document/node";

export default class Verne {

  public doc: Doc = null;
  public actions: Readonly<Actions> = null;

  public static fromHtml(html: string): Verne  {
    const doc = Doc.fromHtml(html);
    return new Verne(doc);
  }

  public static fromElement(el: Element): Verne {
    const doc = Doc.fromElement(el);
    return new Verne(doc);
  }

  constructor(doc: Doc = new Doc()) {
    this.doc = doc;
    this.actions = new Actions(this);
    Node.editor = this;
  }
}
