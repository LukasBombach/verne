import { useRef, useEffect, useContext } from "react";
import domContext from "../state/dom";
import useEvents from "./useEvents";
import { Node } from "../types";

export default function useDom<T extends globalThis.Node>(node: Node) {
  const emitter = useEvents();
  const domMap = useContext(domContext);
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;
    const domNode = ref.current;
    domMap.set(domNode, node);
    emitter.emit("mount", { domNode, node });
    return () => {
      domMap.delete(domNode);
      emitter.emit("unmount", { domNode, node });
    };
  }, [domMap, node, emitter]);

  return ref;
}
