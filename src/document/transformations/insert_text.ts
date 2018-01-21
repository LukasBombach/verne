import Doc from "../doc";
import TextNode from "../text_node";

interface InsertTextTransformationParams {
  node: TextNode;
  offset: number;
  key: string;
}

export default function (doc: Doc, { node, offset, key}: InsertTextTransformationParams): Doc {
  const oldBlockNode = node.parent;
  const newTextNode = node.insertString(offset, key);
  const newBlockNode = oldBlockNode.replaceText(node, newTextNode);
  return doc.replaceBlockNode(oldBlockNode, newBlockNode);
}