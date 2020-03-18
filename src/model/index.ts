import produce from "immer";
import TextNode from "../components/Text";

export type NodeType = typeof TextNode;
export type Props<T extends NodeType> = T extends NodeType
  ? Parameters<T>[0]
  : never;

export interface Node<T extends NodeType> {
  node: T;
  key: number;
  props: Props<T>;
}

export const initialState: Node<typeof TextNode>[] = [
  { node: TextNode, key: 1, props: { text: "hello world" } }
];
