import React, { useState, useRef, useEffect } from "react";

const Text = ({ text }: { text: string }) => {
  return <span>{text}</span>;
};

const Verne = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [caret, setCaret] = useCaret();
  const [text, setText] = useState("hello world");

  const keyDownHandler = (event: KeyboardEvent) => {
    event.preventDefault();

    if (!caret) return;
    if (!/^[\w\s]$/.test(event.key)) return;
    const newText = insertString(text, caret.offset, event.key);
    setText(newText);
    const node = editorRef.current?.firstChild?.firstChild as Node;
    setCaret({ node, offset: caret.offset + 1 });
  };

  useKeyboard(editorRef, keyDownHandler);

  return (
    <div {...getEditableProps()} ref={editorRef}>
      <Text text={text} />
      <Text text=" text2" />
    </div>
  );
};

function useKeyboard(
  ref: React.RefObject<HTMLElement>,
  handler: (event: KeyboardEvent) => void
) {
  useEffect(() => {
    if (ref.current) {
      const element = ref.current;
      element.addEventListener("keydown", handler);
      return () => element.removeEventListener("keydown", handler);
    }
  });
}

function useCaret(): [Caret | undefined, (caret: Caret) => void] {
  const [caret, setCaretToState] = useState<Caret>();

  const setCaret = (caret: Caret) => {
    caret.synced = Boolean(caret.synced);
    setCaretToState(caret);
  };

  useEffect(() => {
    if (caret && !caret.synced) {
      const range = new Range();
      setCaretToState({ ...caret, synced: true });
      range.setStart(caret.node, caret.offset);
      range.setEnd(caret.node, caret.offset);
      window.document.getSelection()?.removeAllRanges();
      window.document.getSelection()?.addRange(range);
    }
  });

  useEffect(() => {
    const onSelectionChangeHandler = () => {
      const selection = window.document.getSelection();
      const range = selection?.getRangeAt(0);
      if (range) {
        const node = range.startContainer;
        const offset = range.startOffset;
        const synced = true;
        setCaretToState({ node, offset, synced });
      }
    };
    document.addEventListener("selectionchange", onSelectionChangeHandler);
    return () => {
      document.removeEventListener("selectionchange", onSelectionChangeHandler);
    };
  }, []);

  return [caret, setCaret];
}

function getOffset() {
  const selection = window.document.getSelection();
  const range = selection?.getRangeAt(0);
  const offset = range?.startOffset;
  if (offset === undefined) {
    throw new Error("Cannot get offset");
  }
  return offset;
}

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

interface Caret {
  node: Node;
  offset: number;
  synced?: boolean;
}

export default Verne;
