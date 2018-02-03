import Doc, { TransformationResult } from "../doc";
import Node from "../node";
import Block from "../block";
import { DeleteSelectionAction } from "../../actions/input";
import Selection from "../../selection";

export default function (doc: Doc, action: DeleteSelectionAction): TransformationResult {

  const { firstNode, lastNode, firstOffset, lastOffset } = action.selection;

  if (firstNode === lastNode) {
    const oldBlockNode = firstNode.parent() as Block;
    const newTextNode = firstNode.removeString(firstOffset, lastOffset);
    const newBlockNode = oldBlockNode.replaceChild(firstNode, newTextNode);
    const newDoc = doc.replaceBlock(oldBlockNode, newBlockNode);
    const newSelection = Selection.caret(newTextNode, firstOffset);
    return { doc: newDoc, selection: newSelection };
  }

  const [oldBlocks, newBlocks] = deleteNodesContainedInSelection(action.selection);

  // debugger;

  // if (oldBlocks[0] === firstNode.parent()) {
    const newFirstTextNode = firstNode.removeString(firstOffset);
    newBlocks[0] = newBlocks[0].replaceChild(firstNode, newFirstTextNode);
  // }

  const newLastTextNode = lastNode.removeString(0, lastOffset);
  newBlocks[newBlocks.length - 1] = newBlocks[newBlocks.length - 1].replaceChild(lastNode, newLastTextNode);

  const docAfterDeletions = doc.replaceBlocks(oldBlocks, newBlocks);
  const newSelection = Selection.caret(newFirstTextNode, firstOffset);
  return { doc: docAfterDeletions, selection: newSelection };

}

function deleteNodesContainedInSelection(selection: Selection): [Block[], Block[]] {
  return Array.from(getNodesToDelete(selection).entries())
    .map(([parent, children]) => [(parent as Block), (parent as Block).deleteChildren(children)])
    .reduce((acc, [oldBlock, newBlock]) => [[...acc[0], oldBlock], [...acc[1], newBlock]], [[], []]) as [Block[], Block[]];
}

function getNodesToDelete({ firstNode, lastNode }: Selection): Map<Node, Node[]> {
  const map = new Map<Node, Node[]>();
  const tuples = Node.nodesBetween(firstNode, lastNode).map(node => [node.parent(), node]);
  tuples.forEach(([parent]) => map.set(parent, []));
  tuples.forEach(([parent, node]) => map.get(parent).push(node));
  return map;
}

