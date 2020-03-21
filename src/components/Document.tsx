import React from "react";
import { KeyDownEvent } from "../events";
import Component from "./Component";
import Text from "./Text";

/* export interface Node<C extends Component> {
  Component: C;
  props: C extends Component<infer P> ? P : never;
} */

export type Node = any;

const nodes = [
  new Text({ text: "hello world. " }),
  new Text({ text: "how are you?" })
];

export default class Document extends Component<{ nodes: Node[] }> {
  static defaultProps = {
    nodes
  };

  async keyDown(event: KeyDownEvent): Promise<Document> {
    const newNode = await event.node.keyDown(event);
    return this.replace(event.node, newNode);
  }

  private replace(node: Node, newNode: Node): Document {
    const index = this.props.nodes.indexOf(node);
    if (index < 0) throw new Error(`Could not finde node ${node.id} in doc`);
    const nodes = [...this.props.nodes];
    nodes.splice(index, 1, newNode);
    return new Document({ nodes });
  }

  render() {
    const props = {
      contentEditable: true,
      suppressContentEditableWarning: true,
      spellCheck: false
    };

    return <div {...props}>{this.props.nodes.map(n => n.render())}</div>;
  }
}
