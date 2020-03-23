import { KeyboardEvent } from "react";
import useEvents, { Emitter } from "./useEvents";
import useSelection, { Selection } from "./useSelection";

export default function useEventHandlers() {
  const emitter = useEvents();

  function onKeyDown(emitter: Emitter, event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();
    const selection = useSelection();

    console.log("selection", selection);
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
