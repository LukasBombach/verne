import React, { useRef, useState, useEffect } from "react";
import { useVerne } from "./";
import type { Node } from "./";

export interface VerneProps {
  document: Node;
}

function useKeyboardIntercept() {
  const ref = useRef<HTMLDivElement>(null);
  const [node, _setNode] = useState<{ text: string }>({ text: "hello" });
  const offsetRef = useRef<number>();

  const nodeRef = React.useRef(node);
  const setNode = (node: { text: string }) => {
    nodeRef.current = node;
    _setNode(node);
  };

  function insertText(textToInsert: string, offset: number) {
    const textBefore = nodeRef.current.text?.slice(0, offset) || "";
    const textAfter = nodeRef.current.text?.slice(offset) || "";
    const text = textBefore + textToInsert + textAfter;
    console.log("current text", nodeRef.current.text);
    setNode({ text });
  }

  function setOffset(offset: number) {
    offsetRef.current = offset;
  }

  function onKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    if (!offsetRef.current) return;
    insertText(event.key, offsetRef.current);
    setOffset(offsetRef.current + 1);
  }

  function onSelectionChange() {
    const range = window.document.getSelection()?.getRangeAt(0);
    if (!range) return;
    console.log("updating caret ref", range.startOffset);
    offsetRef.current = range.startOffset;
  }

  // Keyboard
  useEffect(() => {
    if (!ref.current) return;
    console.log("updating keydown event listener");
    const el = ref.current;
    el.addEventListener("keydown", onKeyDown);
    return () => el.removeEventListener("keydown", onKeyDown);
  }, []);

  // Selection Change
  useEffect(() => {
    const doc = window.document;
    console.log("updating selectionchange event listener");
    doc.addEventListener("selectionchange", onSelectionChange);
    return () => {
      doc.removeEventListener("selectionchange", onSelectionChange);
    };
  }, []);

  // Set Caret on change
  useEffect(() => {
    if (!ref.current || !offsetRef.current) return;
    console.log("setting caret");
    const range = new Range();
    const node = ref.current.firstChild!;
    range.setStart(node, offsetRef.current);
    range.setEnd(node, offsetRef.current);
    document.getSelection()?.removeAllRanges();
    document.getSelection()?.addRange(range);
  });

  return { ref, node };
}

const Verne = (props: VerneProps) => {
  const { ref, node } = useKeyboardIntercept();

  return (
    <div
      ref={ref}
      contentEditable={true}
      spellCheck={false}
      suppressContentEditableWarning={true}
      style={{ whiteSpace: "pre-wrap" }}
    >
      {node.text}
    </div>
  );
};

// const { ref, document } = useVerne(props.document);
/* {document.children?.map((node, i) => (
  <span key={i}>{node.text}</span>
))} */

export default Verne;
