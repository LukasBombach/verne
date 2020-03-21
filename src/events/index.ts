import { Node } from "../components/Document";

export interface KeyDownEvent {
  node: Node;
  offset: number;
  str: string;
}
