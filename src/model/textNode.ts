import Node from "./node";
import { KeyDownEvent } from "../event";

export default class TextNode extends Node {
  readonly text: string;

  constructor(text: string) {
    super();
    this.text = text;
  }

  async keyDown({ offset, str }: KeyDownEvent): Promise<TextNode> {
    const newText = this.text.slice(0, offset) + str + this.text.slice(offset);
    return new TextNode(newText);
  }
}
