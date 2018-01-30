import Doc, {TransformationResult} from "../doc";
import Block from "../block";
import {DeleteRangeAction} from "../../actions/input";
import Selection from "../../selection";

export default function (doc: Doc, { range }: DeleteRangeAction): TransformationResult {

  const { startNode, endNode, startOffset, endOffset } = range;

  if (startNode === endNode) {
    const oldBlockNode = startNode.parent() as Block;
    const newTextNode = startNode.removeString(startOffset, endOffset);
    const newBlockNode = oldBlockNode.replaceText(startNode, newTextNode);
    const newDoc = doc.replaceBlock(oldBlockNode, newBlockNode);
    const newSelection = Selection.caret(newTextNode, startOffset); // todo gnaaaaaaahhhh, must work with selection
    return { doc: newDoc, selection: newSelection };
  }

}
