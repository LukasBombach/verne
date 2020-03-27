import { useState } from "react";
import { DocumentContext, Nodes, UpdateNode } from "../types";
import Text from "../components/Text";

const initialNodes: Nodes = [
  { Node: Text, id: 0, text: "Hello world! " },
  { Node: Text, id: 1, text: "How are you?" }
];

export default function useDocumentProvider(): DocumentContext {
  const [nodes, setNodes] = useState<Nodes>(initialNodes);

  const updateNode: UpdateNode = (node, props) => {
    const index = nodes.findIndex(n => n.id === node.id);
    if (index < 0) throw new Error(`Could not finde node ${node.id} in doc`);
    const newProps = { ...node, ...props };
    const newNodes = [...nodes];
    newNodes.splice(index, 1, { ...newProps, Node: Text });
    setNodes(newNodes);
    return newProps;
  };

  return { nodes, updateNode };
}
