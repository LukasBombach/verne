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

export type UpdateNode = <N extends TextProps>(
  currentNode: N,
  update: Partial<N>
) => TextProps;

export interface DocumentContext {
  nodes: Nodes;
  updateNode: UpdateNode;
}

export interface Selection {
  props: TextProps;
  offset: number;
}

export interface Events {
  keyDown: {
    props: TextProps;
    id: number;
    offset: number;
    str: string;
  };

  mount: {
    node: TextProps;
    domNode: globalThis.Node;
  };

  unmount: {
    node: TextProps;
    domNode: globalThis.Node;
  };
}
