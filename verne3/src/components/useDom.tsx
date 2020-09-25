import { useRef } from "react";

import { Node } from "./Document";
import { VerneApi } from "./useVerne";

export function useDom(verne?: VerneApi) {
  const ref = useRef<HTMLDivElement>(null);

  function getTextNode(node: Node): globalThis.Node {
    if (!ref.current) throw new Error("ref.current is undefined");
    if (!root.children) throw new Error("root has no children");
    const index = root.children.indexOf(node);
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
