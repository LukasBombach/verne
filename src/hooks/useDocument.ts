import { useContext } from "react";
import documentContext from "../context/document";
import useDomMap from "../hooks/useDomMap";
import { Node } from "../types";

export default function useDocument<T extends HTMLElement>(node: Node) {
  const ref = useDomMap<T>(node);
  const doc = useContext(documentContext);
  return { ...doc, ref };
}
