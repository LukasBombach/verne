import { KeyboardEvent } from "react";
import useDocument from "./useDocument";
import useEvents from "./useEvents";

export default function useEventHandlers() {
  return { onKeyDown };
}

function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
  event.stopPropagation();
  event.preventDefault();
  const selection = window.getSelection();
  const emitter = useEvents();
  const [doc, setDoc] = useDocument();
  if (!selection) return console.warn("No selection");
  if (!selection.isCollapsed) return console.warn("Selection is not collapsed");
}
