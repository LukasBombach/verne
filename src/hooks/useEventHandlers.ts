import { KeyboardEvent } from "react";
// import produce from "immer";
// import useDocument from "./useDocument";
// import useEvents from "./useEvents";

export default function useEventHandlers() {
  const selection = window.getSelection();
  // const emitter = useEvents();
  // const [doc, setDoc] = useDocument();

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    event.stopPropagation();
    event.preventDefault();
    if (!selection) return console.warn("No selection");
    if (!selection.isCollapsed)
      return console.warn("Selection is not collapsed");
    debugger;
    console.log(event);
  }

  return { onKeyDown };
}
