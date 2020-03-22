import React from "react";
import { KeyDownEvent } from "../events";
import Component from "./Component";
import Text from "./Text";

const nodes: Component[] = [
  new Text({ text: "hello world. " }),
  new Text({ text: "how are you?" })
];

export default class Document extends Component {
  state = { nodes };

  async keyDown(event: KeyDownEvent): Promise<void> {
    const newNode = await event.node.keyDown(event);
    this.replace(event.node, newNode);
  }

  private replace(node: Component, newNode: Component) {
    const index = this.state.nodes.indexOf(node);
    if (index < 0) throw new Error(`Could not finde node ${node.id} in doc`);
    const nodes = [...this.state.nodes];
    nodes.splice(index, 1, newNode);
    this.setState({ nodes });
  }

  private nativeKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    event.stopPropagation();
    event.preventDefault();
    const selection = window.getSelection();
    if (!selection) return console.warn("No selection");
    if (!selection.isCollapsed)
      return console.warn("Selection is not collapsed");
    if (!selection.focusNode) return console.warn("No focusNode");
    if (!selection.focusNode.parentElement)
      return console.warn("No parentElement");
    const index = Array.prototype.indexOf.call(
      selection.focusNode.parentElement.childNodes,
      selection.focusNode
    );
    const node = this.state.nodes[index];
    const offset = selection.focusOffset;
    const str = event.key;
    this.keyDown({ node, offset, str }).then(() => {});
  }

  render() {
    const props = {
      contentEditable: true,
      suppressContentEditableWarning: true,
      spellCheck: false
    };
    return (
      <div {...props} onKeyDown={e => this.nativeKeyDown(e)}>
        {this.state.nodes.map(({ constructor: Node, id, props }) => (
          <Node key={id} {...props} />
        ))}
      </div>
    );
  }
}
