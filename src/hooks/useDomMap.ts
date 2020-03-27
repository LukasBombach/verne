import { useRef, useEffect, useContext } from "react";
import domContext from "../context/dom";
import useEvents from "../hooks/useEvents";
import { Node, TextProps } from "../types";

export default function useDomMap<T extends globalThis.Node>(
  node: Node<TextProps>
) {
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
  }, [domMap, node]);

  return ref;
}
