import { FC } from "react";

export interface Props {
  id: number;
}

export interface TextProps extends Props {
  text: string;
}

export interface Node<P = TextProps> {
  Component: FC<P>;
  props: P;
}

export type UpdateNode = <N extends Node>(
  currentNode: N,
  props: Partial<N["props"]>
) => Promise<N>;

export interface DocumentContext {
  nodes: Node[];
  updateNode: UpdateNode;
}

export interface Selection {
  node: Node;
  offset: number;
}

export interface Events {
  keyDown: {
    node: Node;
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
