import Node from "./node";
import Block from "./block";

export default class Text extends Node {

  private _text: string;
  private _attrs: string[];

  constructor(text: string = '', attrs: string[] = [], parent: Node, originId?: number) {
    super(parent, null, originId);
    this._text = text;
    this._attrs = attrs;
  }

  text(): string {
    return this._text;
  }

  attrs(): string[] {
    return this._attrs;
  }

  length(): number {
    return this.text().length;
  }

  setParent(newParent: Block): Text {
    return new Text(this.text(), this.attrs(), newParent, this.originId());
  }

  insertString(offset: number, str: string): Text {
    const text = this.text().substr(0, offset) + str + this.text().substr(offset);
    const attrs = this.attrs().slice(0);
    return new Text(text, attrs, this.parent(), this.originId());
  }

  removeString(startOffset: number, endOffset: number = this.length()): Text {
    const lowerOffset = Math.min(startOffset, endOffset);
    const higherOffset = Math.max(startOffset, endOffset);
    const text = this.text().substr(0, lowerOffset)  + this.text().substr(higherOffset);
    const attrs = this.attrs().slice(0);
    return new Text(text, attrs, this.parent(), this.originId());
  }

  prevTextLeaf(): Text {
    return this.prevLeaf(node => node instanceof Text) as Text;
  }

  nextTextLeaf(): Text {
    return this.nextLeaf(node => node instanceof Text) as Text;
  }

}
