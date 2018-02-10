import Node from "./node";

interface CloneProperties {
  text?: string;
  attrs?: string[];
  parent?: Node;
  originId?: number;
}

export default class Text extends Node {

  private _text: string;
  private _attrs: string[];

  constructor(text: string = '', attrs: string[] = [], originId?: number) {
    super(originId);
    this._text = text;
    this._attrs = attrs;
  }

  get text(): string {
    return this._text;
  }

  get attrs(): string[] {
    return this._attrs;
  }

  get length(): number {
    return this.text.length;
  }

  insertString(offset: number, str: string): Text {
    const text = this.text.substr(0, offset) + str + this.text.substr(offset);
    return this.clone({ text });
  }

  removeString(startOffset: number, endOffset: number = this.length): Text {
    const lowerOffset = Math.min(startOffset, endOffset);
    const higherOffset = Math.max(startOffset, endOffset);
    const text = this.text.substr(0, lowerOffset)  + this.text.substr(higherOffset);
    return this.clone({ text });
  }

  prevTextLeaf(): Text {
    return this.prevLeaf(node => node instanceof Text) as Text;
  }

  nextTextLeaf(): Text {
    return this.nextLeaf(node => node instanceof Text) as Text;
  }

  clone(properties: CloneProperties = {}): Text {
    const text = properties.text || this.text;
    const attrs = properties.attrs || this.attrs.slice(0);
    const originId = properties.originId || this.originId;
    return new Text(text, attrs, originId);
  }

}
