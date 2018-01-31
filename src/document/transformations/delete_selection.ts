import Doc, {TransformationResult} from "../doc";
import Block from "../block";
import {DeleteSelectionAction} from "../../actions/input";
import Selection from "../../selection";

export default function (doc: Doc, { selection }: DeleteSelectionAction): TransformationResult {

  const { focusNode, anchorNode, focusOffset, anchorOffset } = selection;

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

}
