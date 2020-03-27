import { useContext } from "react";
import documentContext from "../state/document";
import useDom from "./useDom";

export default function useDocument<T extends HTMLElement>(id: number) {
  const doc = useContext(documentContext);
  const node = doc.nodes.find(node => node.props.id === id);
  if (!node) throw new Error(`Could not find node ${id} in document`);
  const ref = useDom<T>(node);
  return { ...doc, ref };
}
