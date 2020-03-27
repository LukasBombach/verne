import { useState } from "react";
import Text from "../components/Text";
import useEvents from "./useEvents";
import { DocumentContext, Node, UpdateNode } from "../types";

const initialNodes: Node[] = [
  { Component: Text, props: { id: 0, text: "Hello world! " } },
  { Component: Text, props: { id: 1, text: "How are you?" } }
];

export default function useDocumentProvider(): DocumentContext {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const emitter = useEvents();

  const updateNode: UpdateNode = async (currentNode, props) => {
    return new Promise(resolve => {
      const index = nodes.findIndex(
        node => node.props.id === currentNode.props.id
      );
      if (index < 0)
        throw new Error(`Could not finde node ${currentNode.props.id} in doc`);
      const newProps = { ...currentNode.props, ...props };
      const newNode = { ...currentNode, props: newProps };
      const newNodes = [...nodes];
      newNodes.splice(index, 1, newNode);
      const handler = ({ node }: { node: Node }) => {
        if (node.props.id === currentNode.props.id) {
          emitter.off("mount", handler);
          resolve(newNode);
        }
      };
      emitter.on("mount", handler);
      setNodes(newNodes);
    });
  };

  return { nodes, updateNode };
}
