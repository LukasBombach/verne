import { useEffect } from "react";
import type { UseVerneRef } from "./";

export function useKeyboard(verne: UseVerneRef) {
  useEffect(() => {
    if (!verne.current) return;

    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      if (!verne.current) return;

      if (!verne.current.caret) {
        throw new Error("verne.current.caret is undefined");
      }
      verne.current.insertText(
        verne.current.caret.node,
        verne.current.caret.offset,
        e.key
      );
    };
    const element = verne.current.ref.current;
    if (!element) return;

    element.addEventListener("keydown", handler);

    return () => {
      element.removeEventListener("keydown", handler);
    };
  }, [verne.current]);
}
