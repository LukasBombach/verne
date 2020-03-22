import { KeyboardEvent } from "react";
import { Emitter } from "mitt";
import { Document } from "../types/";

export default function useNativeEvents(doc: Document, emitter: Emitter) {
  const eventHandlers = {
    onKeyDown: (event: KeyboardEvent) => onKeyDown(doc, emitter, event)
  };

  return eventHandlers;
}

function onKeyDown(doc: Document, emitter: Emitter, event: KeyboardEvent) {
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
