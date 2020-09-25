import { useState, useEffect } from "react";

import type { Node } from "./Document";

export interface Caret {
  node: Node;
  offset: number;
}

export function useMouse(getNode: (textNode: globalThis.Node) => Node) {
  const [caret, setCaret] = useState<Caret>();

  const onSelectionChange = () => {
    const range = window.document.getSelection()?.getRangeAt(0);
    if (!range) return;
    const node = getNode(range.startContainer);
    const offset = range.startOffset;
    setCaret({ node, offset });
  };

  useEffect(() => {
    window.document.addEventListener("selectionchange", onSelectionChange);
    return () => {
      window.document.removeEventListener("selectionchange", onSelectionChange);
    };
  }, []);

  return caret;
}
