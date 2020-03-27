import { FC } from "react";

export interface Props {
  id: number;
}

export interface TextProps extends Props {
  text: string;
}

export type VC<P extends Props> = FC<{ node: P }>;
export type Node<P extends Props> = P & { Node: VC<P> };
export type Nodes = Node<TextProps>[];

export type UpdateNode = <N extends Node<TextProps>>(
  currentNode: N,
  update: Partial<N>
) => Promise<N>;

export interface DocumentContext {
  nodes: Nodes;
  updateNode: UpdateNode;
}

export interface Selection {
  node: Node<TextProps>;
  offset: number;
}

export interface Events {
  keyDown: {
    node: Node<TextProps>;
    id: number;
    offset: number;
    str: string;
  };

  mount: {
    node: Node<TextProps>;
    domNode: globalThis.Node;
  };

  unmount: {
    node: Node<TextProps>;
    domNode: globalThis.Node;
  };
}
