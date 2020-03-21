import Component from "../components/Component";

export interface KeyDownEvent {
  node: Component;
  offset: number;
  str: string;
}
