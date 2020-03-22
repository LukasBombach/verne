import { KeyboardEvent } from "react";
import useDocument from "./useDocument";
import useEvents, { VerneEmitter } from "./useEvents";
import { Document } from "../types";

export default function useEventHandlers() {
  const { doc } = useDocument();
  const emitter = useEvents();

  return {
    onKeyDown: (event: KeyboardEvent) => onKeyDown(doc, emitter, event)
  };
}

function onKeyDown(doc: Document, emitter: VerneEmitter, event: KeyboardEvent) {
  event.stopPropagation();
  event.preventDefault();
  const selection = window.getSelection();
  if (!selection) return console.warn("No selection");
  if (!selection.isCollapsed) return console.warn("Selection is not collapsed");
  if (!selection.focusNode) return console.warn("No focusNode");
  if (!selection.focusNode.parentElement)
    return console.warn("No parentElement");
  const index = Array.prototype.indexOf.call(
    selection.focusNode.parentElement.childNodes,
    selection.focusNode
  );
  const node = doc[index];
  const offset = selection.focusOffset;
  const str = event.key;
  emitter.emit("keyDown", { node, offset, str });
}
