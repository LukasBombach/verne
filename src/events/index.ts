import { Node } from "../context/document";

export interface KeyDownEvent {
  node: Node<Text>;
  offset: number;
  str: string;
}
