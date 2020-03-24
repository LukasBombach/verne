import { createContext, FC } from "react";

export type Node<P extends {}> = P & { Node: VC<P> };
export type VC<P = {}> = FC<{ node: P & { id: number } }>;

export type UpdateNode = <N extends Node<any>>(
  currentNode: N,
  update: Partial<N>
) => void;

export interface DocumentContext {
  nodes: VC[];
  updateNode: UpdateNode;
}

export const initialValue: DocumentContext = {
  nodes: [],
  updateNode: () => {}
};

const documentContext = createContext<DocumentContext>(initialValue);

export default documentContext;
