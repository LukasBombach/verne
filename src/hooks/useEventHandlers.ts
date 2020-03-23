import { KeyboardEvent } from "react";
import useDocument from "../hooks/useDocument";
import useEvents, { Emitter } from "./useEvents";
import getSelection from "../lib/getSelection";

export default function useEventHandlers() {
  const emitter = useEvents();
  const doc = useDocument();

  function onKeyDown(emitter: Emitter, event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();
    const selection = getSelection(doc);
    if (!selection) return;
    const { node, offset } = selection;
    const str = event.key;
    console.log("keyDown", { node, offset, str });
    emitter.emit("keyDown", { node, offset, str });
  }

  return {
    onKeyDown: (event: KeyboardEvent) => onKeyDown(emitter, event)
  };
}
