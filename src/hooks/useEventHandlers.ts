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
    const nodeId = map.get(selection.focusNode.parentElement);
    if (!nodeId) return console.warn("No nodeId");
    doc.keyDown(nodeId, selection.focusOffset, event.key);
    console.log(nodeId);
  }

  return { onKeyDown };
}
