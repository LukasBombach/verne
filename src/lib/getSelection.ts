import { domMap } from "../context/dom";
import { Selection } from "../types";

export default function getSelection(): Selection {
  const selection = window.getSelection();
  if (!selection?.focusNode?.parentElement)
    throw new Error("Could not find focusNode");
  const props = domMap.get(selection.focusNode.parentElement);
  if (!props) throw new Error("Could not find verne node");
  const offset = selection.focusOffset;
  return { props, offset };
}
