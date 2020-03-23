import { createContext } from "react";

export type Node<T extends { id: number } = { id: -1 }> = T;
export type Document = Node[];

export interface DocumentContext {
  nodes: Node[];
  updateNode: (currentNode: Node, update: Partial<Node>) => void;
}

export const initialValue: DocumentContext = {
  nodes: [],
  updateNode: (currentNode, update) => {}
};

const documentContext = createContext<DocumentContext>(initialValue);

export default documentContext;
