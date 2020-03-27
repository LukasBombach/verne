import { domMap } from "../state/dom";

import { Selection } from "../types";

export default function setSelection({ node, offset }: Selection): void {
  const entry = [...domMap.entries()].find(
    ([, { props }]) => props.id === node.props.id
  );
  if (!entry) {
    throw new Error("Could not find dom node");
  }

  const domNode = entry[0].firstChild;
  const selection = window.getSelection();
  const nativeRange = document.createRange();

  if (!selection || !domNode) {
    throw new Error("Could not get selection");
  }

  nativeRange.setStart(domNode, offset);
  nativeRange.setEnd(domNode, offset);
  selection.removeAllRanges();
  selection.addRange(nativeRange);
}
