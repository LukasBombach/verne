import Doc, {TransformationResult} from "../doc";
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
    const newBlockNode = oldBlockNode.replaceText(focusNode, newTextNode);
    const newDoc = doc.replaceBlock(oldBlockNode, newBlockNode);
    const newSelection = Selection.caret(newTextNode, lowerOffset);
    return { doc: newDoc, selection: newSelection };
  }

  console.warn('Did not handle DeleteSelectionAction in delete_selection transformation', action);
  return { doc, selection: action.selection };

}
