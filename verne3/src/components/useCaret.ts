import React, { useState, useEffect } from "react";
import { useDocument } from "./Document";

import type { Node } from "./Document";

interface Caret {
  node: Node;
  offset: number;
}

type UseCaretApi = [
  Caret | undefined,
  React.Dispatch<React.SetStateAction<Caret | undefined>>
];

function setSelection(node: Node, offset: number) {
  const range = new Range();
  range.setStart(node, offset);
  range.setEnd(node, offset);
  document.getSelection()?.removeAllRanges();
  document.getSelection()?.addRange(range);
}

function useNativeSelection(onChange: (node: Node, offset: number) => void) {
  const verneDocument = useDocument();

  const handler = () => {
    const range = document.getSelection()?.getRangeAt(0);
    if (!range) return;
    const node = verneDocument.getNode(range.startContainer);
    const offset = range.startOffset;
    onChange(node, offset);
  };

  useEffect(() => {
    document.addEventListener("selectionchange", handler);
    return () => document.removeEventListener("selectionchange", handler);
  }, []);
}

export function useCaret(): UseCaretApi {
  const [caret, setCaret] = useState<Caret>();
  const document = useDocument();

  useNativeSelection((node, offset) => {
    setCaret({ node, offset });
  });

  useEffect(() => {
    if (!caret) return;
    const node = document.getTextNode(caret.node);
    setSelection(node, caret.offset);
  });

  return [caret, setCaret];
}
