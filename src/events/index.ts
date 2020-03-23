import { Node } from "../context/document";

export interface KeyDownEvent {
  node: Node;
  offset: number;
  str: string;
}
