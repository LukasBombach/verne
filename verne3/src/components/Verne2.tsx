import React, { useState, useRef, useEffect } from "react";

/** ************************************************************************************************************************
 *
 * TYPES
 *
 * *************************************************************************************************************************/

interface Document {
  root: Node;
  insertText: (node: Node, offset: number, textToInsert: string) => void;
  getTextNode: (node: Node) => globalThis.Node;
  getDocumentNode: (textNode: globalThis.Node) => Node;
}

interface Node {
  text?: string;
  children?: Node[];
}

/* type Node = NodeWithText | NodeWithChildren;

interface NodeWithText {
  text: string;
}

interface NodeWithChildren {
  children: Node[];
} */

interface Caret {
  node: Node;
  offset: number;
  synced?: boolean;
}

/** ************************************************************************************************************************
 *
 * Code
 *
 * *************************************************************************************************************************/

const intitialRoot: Node = {
  children: [{ text: "hello " }, { text: "world" }],
};

const Text = ({ node }: { node: Node }) => {
  return <span>{node.text}</span>;
};

const Verne = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const document = useDocument(editorRef, intitialRoot);
  const [caret, setCaret] = useCaret(document);

  useKeyboard(editorRef, event => {
    event.preventDefault();
    if (!caret) return;
    if (!/^[\w\s]$/.test(event.key)) return;
    const newNode = document.insertText(caret.node, caret.offset, event.key);
    setCaret(newNode, caret.offset + 1);
  });

  return (
    <div {...getEditableProps()} ref={editorRef}>
      {document.root.children?.map((node, i) => (
        <Text key={i} node={node} />
      ))}
    </div>
  );
};

/** ************************************************************************************************************************
 *
 * HOOKS
 *
 * *************************************************************************************************************************/

function useDocument(
  ref: React.RefObject<HTMLElement>,
  initialRoot: Node = {}
) {
  const [root, setRoot] = useState<Node>(initialRoot);

  function insertText(node: Node, offset: number, textToInsert: string) {
    const textBefore = node.text?.slice(0, offset) || "";
    const textAfter = node.text?.slice(offset) || "";
    const text = textBefore + textToInsert + textAfter;
    const newNode = { ...node, text };
    replaceNode(node, newNode);
    return newNode;
  }

  function getTextNode(node: Node): globalThis.Node {
    if (!root.children) throw new Error("root has no children");
    if (!ref.current) throw new Error("missing editor ref");
    const index = root.children.indexOf(node);
    if (index < 0) throw new Error("Cannot find node");
    const textNode = Array.from(ref.current.childNodes)[index].firstChild;
    if (!textNode) throw new Error("Could not find textNode");
    return textNode;
  }

  function getDocumentNode(textNode: globalThis.Node): Node {
    if (!root.children) throw new Error("root has no children");
    if (!textNode.parentNode) throw new Error("textNode has no parentNode");
    const index = Array.prototype.indexOf.call(
      textNode.parentNode.children,
      textNode
    );
    if (index < 0) throw new Error("Cannot find textNode");
    return root.children[index];
  }

  function replaceNode(currentNode: Node, newNode: Node) {
    if (!root.children) throw new Error("root has no children");
    const index = root.children.indexOf(currentNode);
    if (index < 0) throw new Error("Cannot find node");
    const children = Object.assign([], root.children, { [index]: newNode });
    setRoot({ ...setRoot, children });
  }

  return { root, insertText, getTextNode, getDocumentNode };
}

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

function useCaret(
  document: Document
): [Caret | undefined, (node: Node, offset: number, synced?: boolean) => void] {
  const [caret, setCaretToState] = useState<Caret>();

  const setCaret = (node: Node, offset: number, synced = false) => {
    setCaretToState({ node, offset, synced });
  };

  useEffect(() => {
    if (caret && !caret.synced) {
      const range = new Range();
      setCaretToState({ ...caret, synced: true });
      const node = document.getTextNode(caret.node);
      range.setStart(node, caret.offset);
      range.setEnd(node, caret.offset);
      window.document.getSelection()?.removeAllRanges();
      window.document.getSelection()?.addRange(range);
    }
  });

  useEffect(() => {
    const onSelectionChangeHandler = () => {
      const selection = window.document.getSelection();
      const range = selection?.getRangeAt(0);
      if (range) {
        const node = document.getDocumentNode(range.startContainer);
        const offset = range.startOffset;
        const synced = true;
        setCaretToState({ node, offset, synced });
      }
    };
    window.document.addEventListener(
      "selectionchange",
      onSelectionChangeHandler
    );
    return () => {
      window.document.removeEventListener(
        "selectionchange",
        onSelectionChangeHandler
      );
    };
  }, []);

  return [caret, setCaret];
}

/** ************************************************************************************************************************
 *
 * HELPERS
 *
 * *************************************************************************************************************************/

function getEditableProps() {
  return {
    contentEditable: true,
    spellCheck: false,
    suppressContentEditableWarning: true,
    style: { whiteSpace: "pre-wrap" },
  } as const;
}

/** ************************************************************************************************************************
 *
 * EXPORTS
 *
 * *************************************************************************************************************************/

export default Verne;
