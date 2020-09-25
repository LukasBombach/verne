import { useState, useEffect } from "react";
import type { Node, UseVerneRef } from "./";

export interface Caret {
  node: Node;
  offset: number;
}

export function useMouse(verne: UseVerneRef) {
  const [caret, setCaret] = useState<Caret>();

  const onSelectionChange = () => {
    const selection = window.document.getSelection();
    const range = selection?.rangeCount && selection?.getRangeAt(0);
    if (!range) return;
    if (!verne.current) {
      throw new Error("selectionchange: missing verne");
    }
    const node = verne.current.getNode(range.startContainer);
    const offset = range.startOffset;
    setCaret({ node, offset });
  };

  useEffect(() => {
    window.document.addEventListener("selectionchange", onSelectionChange);
    return () => {
      window.document.removeEventListener("selectionchange", onSelectionChange);
    };
  }, [verne]);

  return { caret, setCaret };
}
