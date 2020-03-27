import { KeyboardEvent } from "react";
import useEvents, { Emitter } from "./useEvents";
import getSelection from "../lib/getSelection";

export default function useEventHandlers() {
  const emitter = useEvents();

  function onKeyDown(emitter: Emitter, event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();
    const selection = getSelection();
    if (!selection) return;
    const { props, offset } = selection;
    const { id } = props;
    const str = event.key;
    const keyDownEvent = { props, id, offset, str };
    emitter.emit("keyDown", keyDownEvent);
  }

  return {
    onKeyDown: (event: KeyboardEvent) => onKeyDown(emitter, event)
  };
}
