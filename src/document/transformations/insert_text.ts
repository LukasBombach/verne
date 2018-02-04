import Doc, {TransformationResult} from "../doc";
import {InsertTextAction} from "../../actions/input";
import Selection from "../../selection";

export default function (doc: Doc, action: InsertTextAction): TransformationResult {
  const { selection: { focusNode: node, focusOffset: offset }, str} = action;
  const oldBlockNode = node.parent();
  const newTextNode = node.insertString(offset, str);
  const newBlockNode = oldBlockNode.replaceChild(node, newTextNode);
  const newDoc = doc.replaceChild(oldBlockNode, newBlockNode);
  const newOffset = offset + 1;
  const newSelection = Selection.caret(newTextNode, newOffset);
  return { doc: newDoc, selection: newSelection };
}

/*export default function (doc: Doc, action: InsertTextAction): TransformationResult {
  const { selection: { focusNode: node, focusOffset: offset }, str} = action;
  const newNode = node.insertString(offset, str);
  const newDoc = doc.replaceInTree(node, newNode);
  const newSelection = Selection.caret(newNode, offset + 1);
  return { doc: newDoc, selection: newSelection };
}*/

