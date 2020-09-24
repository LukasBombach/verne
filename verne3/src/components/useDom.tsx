import { useRef } from "react";

import { Node, useDocument } from "./Document";

export function useDom() {
  const document = useDocument();
  const ref = useRef<HTMLDivElement>(null);

  function getTextNode(node: Node): globalThis.Node {
    if (!ref.current) throw new Error("ref.current is undefined");
    if (!document.root.children) throw new Error("root has no children");
    const index = document.root.children.indexOf(node);
    if (index < 0) throw new Error("Cannot find node");
    const textNode = Array.from(ref.current.childNodes)[index].firstChild;
    if (!textNode) throw new Error("Could not find textNode");
    return textNode;
  }

  return {
    ref,
    getTextNode,
  };
}
