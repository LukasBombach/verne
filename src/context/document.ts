import { createContext } from "react";

export type Node<T extends {} = {}> = { id: number } & T;
export type Document = Node[];

export interface DocumentContext {
  nodes: Node[];
  updateNode: <T extends {} = {}>(
    currentNode: Node<T>,
    update: Partial<Node<T>>
  ) => void;
}

export const initialValue: DocumentContext = {
  nodes: [],
  updateNode: (currentNode, update) => {}
};

const documentContext = createContext<DocumentContext>(initialValue);

export default documentContext;
