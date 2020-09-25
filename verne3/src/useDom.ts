import { useRef } from "react";
import type { Node, UseVerneRef } from "./";

export type DomNode = globalThis.Node;

export function useDom(verne: UseVerneRef) {
  const ref = useRef<HTMLDivElement>(null);

  function getTextNode(node: Node): DomNode {
    if (!verne.current) {
      throw new Error("useDom: missing verne.current");
    }
    if (!ref.current) throw new Error("ref.current is undefined");
    if (!verne.current.document.children)
      throw new Error("root has no children");
    const index = verne.current.document.children.indexOf(node);
    if (index < 0) {
      // debugger;
      throw new Error("getTextNode Cannot find node");
    }
    const textNode = Array.from(ref.current.childNodes)[index].firstChild;
    if (!textNode) throw new Error("Could not find textNode");
    return textNode;
  }

  return {
    ref,
    getTextNode,
  };
}
