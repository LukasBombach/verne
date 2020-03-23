import { KeyboardEvent } from "react";
import useEvents, { Emitter } from "./useEvents";
import useSelection, { Selection } from "./useSelection";

export default function useEventHandlers() {
  const emitter = useEvents();
  const selection = useSelection();

  return {
    onKeyDown: (event: KeyboardEvent) => onKeyDown(emitter, selection, event)
  };
}

function onKeyDown(
  emitter: Emitter,
  selection: Selection,
  event: KeyboardEvent
) {
  event.stopPropagation();
  event.preventDefault();
  emitter.emit("keyDown", { ...selection, str: event.key });
}
