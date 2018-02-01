import Node from "./node";
import TextNode from "./text";

export default class Block extends Node {

  private _tagName: string;

  constructor(tagName: string, parent: Node, children: Node[], originId?: number) {
    super(parent, children, originId);
    this._tagName = tagName;
    this.children().forEach(child => child.__dangerouslyMutateParent(this));
  }

  tagName() {
    return this._tagName;
  }

  replaceText(oldTextNode: TextNode, newTextNode: TextNode): Block {
    const children = this.children().slice(0);
    const index = children.indexOf(oldTextNode);
    children[index] = newTextNode;
    return new Block(this.tagName(), this.parent(), children, this.originId());
  }

}
