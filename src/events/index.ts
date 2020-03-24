import { Node } from "../context/document";

export interface KeyDownEvent {
  node: Node<any>;
  offset: number;
  str: string;
}
