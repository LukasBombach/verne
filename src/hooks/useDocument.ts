import { useState } from "react";
import produce from "immer";
import TextNode from "../components/Text";

type NodeType = typeof TextNode;
type Props<T extends NodeType> = T extends NodeType ? Parameters<T>[0] : never;

interface Node<T extends NodeType> {
  node: T;
  key: number;
  props: Props<T>;
}

const initialDoc: Node<typeof TextNode>[] = [
  { node: TextNode, key: 1, props: { text: "hello world." } },
  { node: TextNode, key: 2, props: { text: "how are you?" } }
];

export default function useDocument() {
  const [doc, setDoc] = useState(initialDoc);
  return [doc, setDoc];
}
