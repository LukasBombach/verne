import Doc, { TransformationResult } from "../doc";
import Node from "../node";
import Block from "../block";
import { DeleteSelectionAction } from "../../actions/input";
import Selection from "../../selection";

export default function (doc: Doc, action: DeleteSelectionAction): TransformationResult {

  const { focusNode, anchorNode, focusOffset, anchorOffset, firstNode, firstOffset } = action.selection;

  if (focusNode === anchorNode) {
    const lowerOffset = Math.min(focusOffset, anchorOffset);
    const higherOffset = Math.max(focusOffset, anchorOffset);
    const oldBlockNode = focusNode.parent() as Block;
    const newTextNode = focusNode.removeString(lowerOffset, higherOffset);
    const newBlockNode = oldBlockNode.replaceChild(focusNode, newTextNode);
    const newDoc = doc.replaceBlock(oldBlockNode, newBlockNode);
    const newSelection = Selection.caret(newTextNode, lowerOffset);
    return { doc: newDoc, selection: newSelection };
  }

  const [oldBlocks, newBlocks] = Array.from(getNodesToDelete(action.selection).entries())
    .map(([parent, children]) => [(parent as Block), (parent as Block).deleteChildren(children)])
    .reduce((acc, [oldBlock, newBlock]) => [[...acc[0], oldBlock], [...acc[1], newBlock]], [[], []]);

  const newDoc = doc.replaceBlocks(oldBlocks, newBlocks);
  const newSelection = Selection.caret(firstNode, firstOffset);
  return { doc: newDoc, selection: newSelection };

}

function getNodesToDelete({ firstNode, lastNode }: Selection): Map<Node, Node[]> {
  const map = new Map<Node, Node[]>();
  const tuples = Node.nodesBetween(firstNode, lastNode).map(node => [node.parent(), node]);
  tuples.forEach(([parent]) => map.set(parent, []));
  tuples.forEach(([parent, node]) => map.get(parent).push(node));
  return map;
}

