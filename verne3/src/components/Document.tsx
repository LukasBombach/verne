import React, { createContext } from "react";
import { useDom } from "./useDom";
import { useDocument } from "./useDocument";

import type { ReactNode, RefObject } from "react";

export interface VerneDocumentProps {
  children: ReactNode;
  root: Node;
}

export interface Node {
  text?: string;
  children?: Node[];
}

export interface Document {
  document: Node;
  ref: RefObject<HTMLDivElement>;
  getTextNode: (node: Node) => globalThis.Node;
  getNode: (textNode: globalThis.Node) => Node;
  insertText: (node: Node, offset: number, textToInsert: string) => void;
}

export const DocumentContext = createContext<Document | null>(null);

export const VerneDocument = (props: VerneDocumentProps) => {
  const { document, getNode, insertText } = useDocument(props.root);
  const { ref, getTextNode } = useDom(document);

  const value = { document, ref, getTextNode, getNode, insertText };

  return (
    <DocumentContext.Provider value={value}>
      {props.children}
    </DocumentContext.Provider>
  );
};
