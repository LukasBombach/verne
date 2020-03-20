import { KeyboardEvent } from "react";
import useDomMap from "./useDomMap";
// import produce from "immer";
import useDocument from "./useDocument";
// import useEvents from "./useEvents";

export default function useEventHandlers() {
  const selection = window.getSelection();
  const { map } = useDomMap();
  // const emitter = useEvents();
  const doc = useDocument();

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    event.stopPropagation();
    event.preventDefault();
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
    const node = doc.nodes[index];
    const offset = selection.focusOffset;
    const str = event.key;
    doc.keyDown(node.id, { offset, str });
  }

  return { onKeyDown };
}
