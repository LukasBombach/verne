import React, { useState, useContext, createContext } from "react";

import type { ReactNode, RefObject } from "react";

export interface VerneDocumentProps {
  children: ReactNode;
}

export interface Node {
  text?: string;
  children?: Node[];
}

export interface Document {
  root: Node;
}

export function insertText(
  root: Node,
  node: Node,
  offset: number,
  textToInsert: string
) {
  const textBefore = node.text?.slice(0, offset) || "";
  const textAfter = node.text?.slice(offset) || "";
  const text = textBefore + textToInsert + textAfter;
  const newNode = { ...node, text };
  replaceNode(root, node, newNode);
}

export function getTextNode(
  editor: HTMLElement,
  root: Node,
  node: Node
): globalThis.Node {
  if (!root.children) throw new Error("root has no children");
  const index = root.children.indexOf(node);
  if (index < 0) throw new Error("Cannot find node");
  const textNode = Array.from(editor.childNodes)[index].firstChild;
  if (!textNode) throw new Error("Could not find textNode");
  return textNode;
}

export function getDocumentNode(root: Node, textNode: globalThis.Node): Node {
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

export function replaceNode(root: Node, currentNode: Node, newNode: Node) {
  if (!root.children) throw new Error("root has no children");
  const index = root.children.indexOf(currentNode);
  if (index < 0) throw new Error("Cannot find node");
  const children = Object.assign([], root.children, { [index]: newNode });
  return { ...root, children };
}

export const DocumentContext = createContext<Document>({ root: {} });

export const intitialRoot: Node = {
  children: [{ text: "hello " }, { text: "world" }],
};

export function useDocument(editorRef: RefObject<HTMLElement>): Document {
  const document = useContext(DocumentContext);
  return document;
}

export const VerneDocument = ({ children }: VerneDocumentProps) => {
  const [root, setRoot] = useState<Node>(intitialRoot);

  return (
    <DocumentContext.Provider value={{ root }}>
      {children}
    </DocumentContext.Provider>
  );
};
