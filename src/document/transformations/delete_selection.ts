import Doc, {TransformationResult} from "../doc";
import Node from "../node";
import Block from "../block";
import {DeleteSelectionAction} from "../../actions/input";
import Selection from "../../selection";

export default function (doc: Doc, action: DeleteSelectionAction): TransformationResult {

  const { focusNode, anchorNode, focusOffset, anchorOffset } = action.selection;

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

  const { firstNode, lastNode } = action.selection;
  const nodesToDelete = Node.nodesBetween(firstNode, lastNode);
  const oldBlocks = nodesToDelete.map(node => (node.parent() as Block));
  const newBlocks = nodesToDelete.map(node => (node.parent() as Block).deleteChild(node));
  const newDoc = doc.replaceBlocks(oldBlocks, newBlocks);
  return { doc: newDoc, selection: action.selection };

}
