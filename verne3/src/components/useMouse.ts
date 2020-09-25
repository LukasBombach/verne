import { useState, useEffect } from "react";

import type { Node } from "./Document";
import { VerneApi } from "./useVerne";

export interface Caret {
  node: Node;
  offset: number;
}

export function useMouse(verne?: VerneApi) {
  const [caret, setCaret] = useState<Caret>();

  const onSelectionChange = () => {
    const selection = window.document.getSelection();
    const range = selection?.rangeCount && selection?.getRangeAt(0);
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

  return { caret, setCaret };
}
