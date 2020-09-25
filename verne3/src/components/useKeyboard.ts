import { useEffect } from "react";
import type { Node } from "./Document";

export function useKeyboard(
  ref: React.RefObject<HTMLDivElement>,
  insertText: (node: Node, offset: number, textToInsert: string) => void
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      console.log("keydown", e.key);
    };
    console.log("adding event listener");
    element.addEventListener("keydown", handler);
    return () => {
      console.log("removing event listener");
      element.removeEventListener("keydown", handler);
    };
  }, []);
}
