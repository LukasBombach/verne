import { useState, useEffect } from "react";
import type { Node, DomNode, UseVerneRef } from "./";

export interface Caret {
  node: Node;
  offset: number;
  synced: boolean;
}

function setSelection(node: DomNode, offset: number) {
  const range = new Range();
  range.setStart(node, offset);
  range.setEnd(node, offset);
  document.getSelection()?.removeAllRanges();
  document.getSelection()?.addRange(range);
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
    const synced = true;
    setCaret({ node, offset, synced });
  };

  useEffect(() => {
    window.document.addEventListener("selectionchange", onSelectionChange);
    return () => {
      window.document.removeEventListener("selectionchange", onSelectionChange);
    };
  }, [verne]);

  useEffect(() => {
    if (!caret) return;
    if (caret.synced) return;
    if (!verne.current) return;
    const node = verne.current.getTextNode(caret.node);
    setSelection(node, caret.offset);
  });

  return { caret, setCaret };
}
