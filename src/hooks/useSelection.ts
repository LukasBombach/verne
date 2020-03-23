import useDocument, { Node } from "./useDocument";

export interface Selection {
  node: Node;
  offset: number;
}

export default function useSelection(): Selection {
  const { doc } = useDocument();
  const selection = window.getSelection();
  if (!selection) {
    throw new Error("No selection");
  }
  if (!selection.isCollapsed) {
    throw new Error("Selection is not collapsed");
  }
  if (!selection.focusNode) {
    throw new Error("No focusNode");
  }
  if (!selection.focusNode.parentElement) {
    throw new Error("No parentElement");
  }

  const index = Array.prototype.indexOf.call(
    selection.focusNode!.parentElement!.childNodes!,
    selection.focusNode!
  );

  const node = doc[index];
  const offset = selection.focusOffset;

  return { node, offset };
}
