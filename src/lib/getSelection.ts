import { domMap } from "../state/dom";
import { Selection } from "../types";

export default function getSelection(): Selection {
  const selection = window.getSelection();
  if (!selection?.focusNode?.parentElement)
    throw new Error("Could not find focusNode");
  const node = domMap.get(selection.focusNode.parentElement);
  if (!node) throw new Error("Could not find verne node");
  const offset = selection.focusOffset;
  return { node, offset };
}
