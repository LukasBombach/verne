import { Node, Props, TextProps } from "../types";

interface FiberNode<P extends Props> {
  return: {
    memoizedProps: {
      node: Node<P>;
    };
  };
}

export interface Selection {
  node: Node<TextProps>;
  offset: number;
}

export default function getSelection(): Selection {
  const selection = window.getSelection();
  if (!selection?.focusNode?.parentElement) throw new Error("Selection error");
  const reactInstance = findReactInstance(selection.focusNode);
  const node = reactInstance.return.memoizedProps.node;
  const offset = selection.focusOffset;
  return { node, offset };
}

function findReactInstance(node: any): FiberNode<TextProps> {
  const keys = Object.keys(node);
  const reactKey = keys.find(k => k.startsWith("__reactInternalInstance"));
  if (!reactKey) throw new Error("Could not find React Internal Instance key");
  return node[reactKey];
}
