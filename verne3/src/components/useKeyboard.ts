import { useEffect } from "react";
import { UseVerne } from "./useVerne";

export function useKeyboard(verne?: UseVerne) {
  useEffect(() => {
    if (!verne) {
      throw new Error("verne is undefined");
    }
    const element = verne.ref.current;
    if (!element) return;

    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      if (!verne.caret) {
        throw new Error("verne.caret is undefined");
      }
      verne.insertText(verne.caret.node, verne.caret.offset, e.key);
    };

    element.addEventListener("keydown", handler);

    return () => {
      element.removeEventListener("keydown", handler);
    };
  }, []);
}
