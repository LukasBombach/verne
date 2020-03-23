import { useContext, useState } from "react";
import documentContext, { Node } from "../context/document";

export default function useDocument() {
  const doc = useContext(documentContext);

  const updateNode = <T extends {}>(node: Node<T>, props: T) => {
    const index = doc.indexOf(node);
    if (index < 0) throw new Error(`Could not finde node ${node.id} in doc`);
    const newDoc = [...doc];
    const newNode = { ...node, ...props };
    newDoc.splice(index, 1, newNode);
  };

  return { doc, updateNode };
}
