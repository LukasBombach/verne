import type { Node } from "../document";

export function insertText(
  node: Node,
  offset: number,
  textToInsert: string
): Node {
  const textBefore = node.text?.slice(0, offset);
  const textAfter = node.text?.slice(offset);
  const text = textBefore + textToInsert + textAfter;
  return { ...node, text };
}
