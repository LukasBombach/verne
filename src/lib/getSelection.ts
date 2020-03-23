import { Node } from "../context/document";
import { DocumentContext } from "../context/document";

export interface Selection {
  node: Node;
  offset: number;
}

export default function getSelection({ nodes }: DocumentContext): Selection {
  const selection = window.getSelection();
  if (!selection?.focusNode?.parentElement) throw new Error("Selection error");
  const index = Array.prototype.indexOf.call(
    selection.focusNode.parentElement.childNodes,
    selection.focusNode
  );
  const node = nodes[index];
  const offset = selection.focusOffset;
  return { node, offset };
}
