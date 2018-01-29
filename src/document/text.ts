import Node from "./node";

interface WalkResult {
  node: Text;
  offset: number;
}

export default class Text extends Node {

  private _text: string;
  private _attrs: string[];

  constructor(text: string = '', attrs: string[] = [], parent: Node) {
    super(parent, null);
    this._text = text;
    this._attrs = attrs;
  }

  text(): string {
    return this._text;
  }

  attrs(): string[] {
    return this._attrs;
  }

  insertString(offset: number, str: string): Text {
    const text = this.text().substr(0, offset) + str + this.text().substr(offset);
    const attrs = this.attrs().slice(0);
    return new Text(text, attrs, this.parent());
  }

  prevText(): Text {
    return this.prevLeaf(node => node instanceof Text) as Text;
  }

  nextText(): Text {
    return this.nextLeaf(node => node instanceof Text) as Text;
  }

  walkByCharacters(numChars: number, startOffset: number = 0): WalkResult {
    if (startOffset > this.text().length) throw new Error(`startOffset (${startOffset} chars) must not be larger than node's text (${this.text().length} chars)`);
    let node = this;
    let remainingChars = numChars + startOffset;
    while (remainingChars > 0) {

    }
    return { node , offset };
  }

}
