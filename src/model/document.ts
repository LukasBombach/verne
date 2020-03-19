import Node from "./node";
import { KeyDownEvent } from "../event";

export default class Document {
  protected static nextId = 0;

  readonly id: number;
  readonly nodes: Node[];

  constructor(nodes: Node[]) {
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

  private replace(node: Node, newNode: Node): Document {
    const index = this.nodes.indexOf(node);
    if (index < 0) throw new Error(`Could not finde node ${node.id} in doc`);
    const newNodes = this.nodes.splice(index, 1, newNode);
    return new Document(newNodes);
  }
}
