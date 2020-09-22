import React, { useState, useRef, useEffect } from "react";
import mitt from "mitt";

// import type { Handler } from "mitt";

interface Caret {
  node: Node;
  offset: number;
}

// const emitter = mitt();

const Text = ({ text }: { text: string }) => {
  // const { onKeyDown, insertText, caret } = useVerne();
  // onKeyDown(key => insertText(caret.offset, key));
  return <span>{text}</span>;
};

// Text.onKeyDown = (key: string, { text }: { text: string }) => {};

const Verne = () => {
  const [text, setText] = useState("hello world");
  const editorRef = useRef<HTMLDivElement>(null);
  const [, setCaret] = useCaret();

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!/^[\w\s]$/.test(event.key)) return;
    const offset = getOffset();
    const newText = insertString(text, offset, event.key);
    setText(newText);
    const node = editorRef.current?.firstChild?.firstChild as Node;
    setCaret({ node, offset: offset + 1 });
  };

  return (
    <div {...getEditableProps()} onKeyDown={onKeyDown} ref={editorRef}>
      <Text text={text} />
      <Text text=" text2" />
    </div>
  );
};

function useCaret(): [Caret | undefined, (caret: Caret) => void] {
  const caretRef = useRef<Caret>();

  const setCaret = (caret: Caret) => {
    caretRef.current = caret;
  };

  const caret = caretRef.current;

  useEffect(() => {
    if (caret) {
      const range = new Range();
      range.setStart(caret.node, caret.offset);
      range.setEnd(caret.node, caret.offset);
      window.document.getSelection()?.removeAllRanges();
      window.document.getSelection()?.addRange(range);
    }
  });

  return [caret, setCaret];
}

function useVerne() {
  function onKeyDown(handler: (key: string) => void) {
    useEffect(() => {
      console.log("onKeyDown called");
    }, []);
  }

  function insertText(offset: number, text: string) {}

  const caret = {
    get offset() {
      return 1;
    },
  };

  return { onKeyDown, insertText, caret };
}

function useInput() {
  useEffect(() => {
    console.log("useInput in useEffect");
  }, []);
}

function useEvents() {}

function getOffset() {
  const selection = window.document.getSelection();
  const range = selection?.getRangeAt(0);
  const offset = range?.startOffset;
  if (offset === undefined) {
    throw new Error("Cannot get offset");
  }
  return offset;
}

/* function setCaret(node: Node, offset: number) {
  const range = new Range();
  range.setStart(node, offset);
  range.setEnd(node, offset);
  window.document.getSelection()?.removeAllRanges();
  window.document.getSelection()?.addRange(range);
}
 */
function insertString(text: string, offset: number, stringToInsert: string) {
  return text.slice(0, offset) + stringToInsert + text.slice(offset);
}

function getEditableProps() {
  return {
    contentEditable: true,
    spellCheck: false,
    suppressContentEditableWarning: true,
    style: { whiteSpace: "pre-wrap" },
  } as const;
}

export default Verne;

/* 
  const caret: Caret = {
    get offset() {
      const selection = window.document.getSelection();
      const range = selection?.getRangeAt(0);
      return range?.startOffset;
    },
    get node() {
      const selection = window.document.getSelection();
      const range = selection?.getRangeAt(0);
      return range?.startContainer;
    },
  }; */
