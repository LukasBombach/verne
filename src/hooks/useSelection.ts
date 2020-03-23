import { Node } from "../context/document";
import useDocument from "./useDocument";

export interface Selection {
  node: Node;
  offset: number;
}

export default function useSelection(): Selection | undefined {
  const { nodes } = useDocument();
  const selection = window.getSelection();
  if (!selection) {
    console.warn("No selection");
    return undefined;
  }
  if (!selection.isCollapsed) {
    console.warn("Selection is not collapsed");
    return undefined;
  }
  if (!selection.focusNode) {
    console.warn("No focusNode");
    return undefined;
  }
  if (!selection.focusNode.parentElement) {
    console.warn("No parentElement");
    return undefined;
  }

  const index = Array.prototype.indexOf.call(
    selection.focusNode!.parentElement!.childNodes!,
    selection.focusNode!
  );

  const node = nodes[index];
  const offset = selection.focusOffset;

  return { node, offset };
}
