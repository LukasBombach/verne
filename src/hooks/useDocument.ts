import { useState } from "react";
import TextNode from "../components/Text";

export type NodeType = typeof TextNode;
export type Props<T extends NodeType> = { text: string }; //T extends NodeType ? Parameters<T>[0] : never;
export type Doc = Node<typeof TextNode>[];

export interface Node<T extends NodeType> {
  node: T;
  id: number;
  props: Props<T>;
}

const initialDoc: Doc = [
  { node: TextNode, id: 1, props: { text: "hello world." } },
  { node: TextNode, id: 2, props: { text: "how are you?" } }
];

export default function useDocument(): [Doc, (doc: Doc) => void] {
  const [doc, setDoc] = useState<Doc>(initialDoc);
  return [doc, setDoc];
}
