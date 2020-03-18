import { KeyboardEvent, useState } from "react";
import mitt from "mitt";

type Name = "keyDown" | "*";
type Handler = (event?: any) => void;
type Event = any;

export default function useEvents() {
  const [emitter] = useState(mitt());
  const on = (name: Name, handler: Handler) => emitter.on(name, handler);
  const off = (name: Name, handler: Handler) => emitter.off(name, handler);
  const emit = (name: Name, event: Event) => emitter.emit(name, event);

  function emitNative(
    name: "keyDown",
    nativeEvent: KeyboardEvent<HTMLDivElement>
  ) {
    const selection = window.getSelection();
    if (!selection) throw new Error("No selection");
    if (!selection.isCollapsed) {
      return console.warn("Selection is not collapsed");
    }
    emit(name, nativeEvent);
  }

  return { on, off, emit, emitNative };
}
