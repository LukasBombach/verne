import React, { useState, useContext, useRef, createContext } from "react";
import type { Node } from "./Document";

export function useDocument(initialRoot: Node) {
  const [root, setRoot] = useState<Node>(initialRoot);

  function getNode(textNode: globalThis.Node): Node {
    if (!root.children) throw new Error("root has no children");
    if (!textNode.parentNode?.parentNode)
      throw new Error("textNode has no parentNode?.parentNode");
    const index = Array.prototype.indexOf.call(
      textNode.parentNode.parentNode.childNodes,
      textNode.parentNode
    );
    if (index < 0) throw new Error("Cannot find textNode");
    return root.children[index];
  }

  function insertText(node: Node, offset: number, textToInsert: string) {
    const textBefore = node.text?.slice(0, offset) || "";
    const textAfter = node.text?.slice(offset) || "";
    const text = textBefore + textToInsert + textAfter;
    const newNode = { ...node, text };
    replaceNode(node, newNode);
  }

  function replaceNode(currentNode: Node, newNode: Node) {
    if (!root.children) throw new Error("root has no children");
    const index = root.children.indexOf(currentNode);
    if (index < 0) throw new Error("Cannot find node");
    const children = Object.assign([], root.children, { [index]: newNode });
    setRoot({ ...root, children });
  }

  return { root, getNode, insertText };
}
