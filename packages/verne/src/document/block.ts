import Node from "./node";

export interface CloneProperties {
  tagName?: string;
  parent?: Node;
  children?: Node[];
  originId?: number;
}

export default class Block extends Node {

  public tagName: Readonly<string>;

  constructor(tagName: string, originId?: number) {
    super(originId);
    this.tagName = tagName;
  }

  clone(properties: CloneProperties = {}): Block {
    const tagName = properties.tagName || this.tagName;
    return new Block(tagName, this.originId);
  }

}
