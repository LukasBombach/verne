import { useState, useEffect } from "react";

import type { Node } from "./Document";
import { UseVerne } from "./useVerne";

export interface Caret {
  node: Node;
  offset: number;
}

export function useMouse(verne?: UseVerne) {
  const [caret, setCaret] = useState<Caret>();

  const onSelectionChange = () => {
    const selection = window.document.getSelection();
    const range = selection?.rangeCount && selection?.getRangeAt(0);
    if (!range) return;
    if (!verne) {
      throw new Error("verne is undefined");
    }
    const node = verne.getNode(range.startContainer);
    const offset = range.startOffset;
    setCaret({ node, offset });
  };

  useEffect(() => {
    window.document.addEventListener("selectionchange", onSelectionChange);
    return () => {
      window.document.removeEventListener("selectionchange", onSelectionChange);
    };
  }, []);

  return { caret, setCaret };
}
