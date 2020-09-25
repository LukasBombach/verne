import { useState } from "react";

export interface Node {
  text?: string;
  children?: Node[];
}

export function useDocument(initialRoot: Node) {
  const [document, setDocument] = useState<Node>(initialRoot);

  function getNode(textNode: globalThis.Node): Node {
    if (!document.children) throw new Error("root has no children");
    if (!textNode.parentNode?.parentNode)
      throw new Error("textNode has no parentNode?.parentNode");
    const index = Array.prototype.indexOf.call(
      textNode.parentNode.parentNode.childNodes,
      textNode.parentNode
    );
    if (index < 0) throw new Error("Cannot find textNode");
    return document.children[index];
  }

  function insertText(node: Node, offset: number, textToInsert: string) {
    const textBefore = node.text?.slice(0, offset) || "";
    const textAfter = node.text?.slice(offset) || "";
    const text = textBefore + textToInsert + textAfter;
    const newNode = { ...node, text };
    replaceNode(node, newNode);
  }

  function replaceNode(currentNode: Node, newNode: Node) {
    if (!document.children) throw new Error("root has no children");
    const index = document.children.indexOf(currentNode);
    if (index < 0) throw new Error("Cannot find node");
    const children = Object.assign([], document.children, { [index]: newNode });
    setDocument({ ...document, children });
    // todo update caret automatically
  }

  return { document, getNode, insertText };
}
