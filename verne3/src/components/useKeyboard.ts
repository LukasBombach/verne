import { useEffect, useRef } from "react";
import type { Node } from "./Document";
import type { Caret } from "./useMouse";
import { VerneApi } from "./useVerne";

export function useKeyboard(verne?: VerneApi) {
  const caretRef = useRef<Caret | undefined>(caret);
  caretRef.current = caret;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      if (caretRef.current) {
        insertText(caretRef.current.node, caretRef.current.offset, e.key);
        // caretRef.current.setOffset(caretRef.current.offset + 1);
      }
    };

    element.addEventListener("keydown", handler);

    return () => {
      element.removeEventListener("keydown", handler);
    };
  }, []);
}
