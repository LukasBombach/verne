import React, { useState, useRef, useEffect } from "react";

const editableProps = {
  contentEditable: true,
  spellCheck: false,
  suppressContentEditableWarning: true,
  style: { whiteSpace: "pre-wrap" },
} as const;

const getOffset = () => {
  const selection = window.document.getSelection();
  const range = selection?.getRangeAt(0);
  const offset = range?.startOffset;
  if (offset === undefined) {
    throw new Error("Cannot get offset");
  }
  return offset;
};

function setCaret(node: Node, offset: number) {
  const range = new Range();
  range.setStart(node, offset);
  range.setEnd(node, offset);
  window.document.getSelection()?.removeAllRanges();
  window.document.getSelection()?.addRange(range);
}

function insertString(text: string, offset: number, stringToInsert: string) {
  return text.slice(0, offset) + stringToInsert + text.slice(offset);
}

const Text = ({ text }: { text: string }) => <span>{text}</span>;

const Verne = () => {
  const [text, setText] = useState("hello world");
  const editorRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<{
    node: ChildNode;
    offset: number;
  }>();

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const offset = getOffset();
    const newText = insertString(text, offset, event.key);
    setText(newText);
    const node = editorRef.current?.firstChild?.firstChild;
    if (node) caretRef.current = { node, offset };
    console.log(node?.textContent);
  };

  useEffect(() => {
    console.log("ref was updated");
    if (caretRef.current)
      setCaret(caretRef.current.node, caretRef.current.offset + 1);
  }, [text]);

  return (
    <div {...editableProps} onKeyDown={onKeyDown} ref={editorRef}>
      <Text text={text} />
    </div>
  );
};

export default Verne;
