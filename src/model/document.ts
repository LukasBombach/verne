// import any from "./component";
import { KeyDownEvent } from "../event";
import Text, { TextProps } from "../model/text";

export interface Node {
  Component: typeof Text;
  props: TextProps;
}

export default class Document {
  protected static nextId = 0;

  readonly id: number;
  readonly nodes: any[];

  constructor(nodes: any[]) {
    this.id = ++Document.nextId;
    this.nodes = nodes;
  }

  async keyDown(id: number, event: KeyDownEvent): Promise<Document> {
    const node = this.find(id);
    const newNode = await node.keyDown(event);
    return this.replace(node, newNode);
  }

  private find(id: number) {
    const node = this.nodes.find(node => node.id === id);
    if (!node) throw new Error(`Could not finde node for id ${id}`);
    return node;
  }

  private replace(node: any, newNode: any): Document {
    const index = this.nodes.indexOf(node);
    if (index < 0) throw new Error(`Could not finde node ${node.id} in doc`);
    const nodes = [...this.nodes];
    nodes.splice(index, 1, newNode);
    return new Document(nodes);
  }
}
