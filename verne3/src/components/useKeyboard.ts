import { useEffect, useRef } from "react";
import type { Node } from "./Document";
import type { Caret } from "./useMouse";

export function useKeyboard(
  ref: React.RefObject<HTMLDivElement>,
  caret: Caret | undefined,
  insertText: (node: Node, offset: number, textToInsert: string) => void
) {
  const caretRef = useRef<Caret | undefined>(caret);
  caretRef.current = caret;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      if (caretRef.current) {
        insertText(caretRef.current.node, caretRef.current.offset, e.key);
      }
    };

    element.addEventListener("keydown", handler);

    return () => {
      element.removeEventListener("keydown", handler);
    };
  }, []);
}
