import Node from "./node";
import TextNode from "./text";

interface CloneProperties {
  tagName?: string;
  parent?: Node;
  children?: Node[];
  originId?: number;
}

export default class Block extends Node {

  private _tagName: string;

  constructor(tagName: string, parent: Node, children: Node[], originId?: number) {
    super(parent, children, originId);
    this._tagName = tagName;
  }

  get tagName() {
    return this._tagName;
  }

  clone(properties: CloneProperties = {}): this {
    const tagName = properties.tagName || this.tagName;
    const parent = properties.parent || this.parent();
    const children = properties.children || this.children().slice(0);
    const originId = properties.originId || this.originId;
    return new (Block as any)(tagName, parent, children, originId);
  }

}
