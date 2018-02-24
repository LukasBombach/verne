import Doc, {TransformationResult} from "../document/doc";
import {InsertTextAction} from "../actions/input";
import Selection from "../selection";

export default function (doc: Doc, action: InsertTextAction): TransformationResult {
  const { selection: { focusNode, focusOffset }, str} = action;
  const newNode = focusNode.insertString(focusOffset, str);
  const newDoc = doc.replaceNode(focusNode, newNode);
  const newSelection = Selection.caret(newNode, focusOffset + 1);
  return { doc: newDoc, selection: newSelection };
}

