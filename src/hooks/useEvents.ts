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

  function emitNative(name: "keyDown", event: KeyboardEvent<HTMLDivElement>) {
    event.stopPropagation();
    event.preventDefault();
    const selection = window.getSelection();
    if (!selection) throw new Error("No selection");
    if (!selection.isCollapsed) {
      return console.warn("Selection is not collapsed");
    }
    debugger;
    emit(name, event);

    // if (/a-zA-Z0-9/.test(event.key)) {
    // } else {
    //   console.warn(`Cannot handle input of ${event.key}`, event);
    // }
  }

  return { on, off, emit, emitNative };
}
