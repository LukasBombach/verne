import { Node } from "../context/document";
import { DocumentContext } from "../context/document";

interface FiberNode<N extends { id: number }> {
  return: {
    memoizedProps: {
      node: N;
    };
  };
}

export interface Selection {
  node: Node<Text>;
  offset: number;
}

export default function getSelection({ nodes }: DocumentContext): Selection {
  const selection = window.getSelection();
  if (!selection?.focusNode?.parentElement) throw new Error("Selection error");
  const reactInstance = findReactInstance(selection.focusNode);
  const node = reactInstance.return.memoizedProps.node;
  const offset = selection.focusOffset;
  return { node, offset };
}

function findReactInstance(node: any): FiberNode<Text> {
  const keys = Object.keys(node);
  const reactKey = keys.find(k => k.startsWith("__reactInternalInstance"));
  if (!reactKey) throw new Error("Could not find React Internal Instance key");
  return node[reactKey];
}
