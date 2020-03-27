import { FC } from "react";

export interface Props {
  id: number;
}

export interface TextProps extends Props {
  text: string;
}

export type VC<P = TextProps> = FC<{ node: Node<P> }>;
export type Node<P = TextProps> = P & { Node: VC<P> };
export type Nodes = Node[];

export type UpdateNode = <N extends Node>(
  currentNode: N,
  update: Partial<N>
) => Promise<N>;

export interface DocumentContext {
  nodes: Nodes;
  updateNode: UpdateNode;
}

export interface Selection {
  node: Node;
  offset: number;
}

export interface Events {
  keyDown: {
    node: Node;
    id: number;
    offset: number;
    str: string;
  };

  mount: {
    node: Node;
    domNode: globalThis.Node;
  };

  unmount: {
    node: Node;
    domNode: globalThis.Node;
  };
}
