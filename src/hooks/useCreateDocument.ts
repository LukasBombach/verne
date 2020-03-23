import { useState } from "react";
import { DocumentContext, Node } from "../context/document";

export default function useCreateDocument(): DocumentContext {
  const [nodes, setNodes] = useState<Node[]>([]);

  const updateNode = (node: Node, props: any) => {
    const index = nodes.indexOf(node);
    if (index < 0) throw new Error(`Could not finde node ${node.id} in doc`);
    const newNode = { ...node, ...props };
    const newNodes = [...nodes];
    newNodes.splice(index, 1, newNode);
    setNodes(newNodes);
  };

  return { nodes, updateNode };
}
