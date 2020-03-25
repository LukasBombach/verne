import { createContext, FC } from "react";

export type VC<P = {}> = FC<{ node: P & { id: number } }>;
export type Node<T = undefined> = { Node: T; id: number } & GetProps<T>;

type GetProps<T> = T extends VC<infer P> ? P : never;

export type UpdateNode = <N extends Node<Text>>(
  currentNode: N,
  update: Partial<N>
) => void;

export interface DocumentContext {
  nodes: Node<any>[];
  updateNode: UpdateNode;
}

export const initialValue: DocumentContext = {
  nodes: [],
  updateNode: () => {}
};

const documentContext = createContext<DocumentContext>(initialValue);

export default documentContext;

/* type Text = VC<{ text: string }>;
type Img = VC<{ src: string }>;

const text: Text = () => <div>asd</div>;
const img: Img = () => <div>asd</div>;

const node: Node<Text> = { Node: text, id: 0, text: "hello world" };

const nodes: (Node<Text> | Node<Img>)[] = [
  { Node: text, id: 0, text: "hello world" },
  { Node: img, id: 1, src: "this should be src" }
]; */
