import { useState } from "react";
import { DocumentContext, Node, UpdateNode } from "../context/document";
import Text from "../components/Text";

const initialNodes: Node<typeof Text>[] = [
  { Node: Text, id: 0, text: "Hello world! " },
  { Node: Text, id: 1, text: "How are you?" }
];

export default function useDocumentProvider(): DocumentContext {
  const [nodes, setNodes] = useState<Node<typeof Text>[]>(initialNodes);

  const updateNode: UpdateNode = (node, props) => {
    const index = nodes.indexOf(node);
    if (index < 0) throw new Error(`Could not finde node ${node.id} in doc`);
    const newNode = { ...node, ...props };
    const newNodes = [...nodes];
    newNodes.splice(index, 1, newNode);
    setNodes(newNodes);
  };

  return { nodes, updateNode };
}
