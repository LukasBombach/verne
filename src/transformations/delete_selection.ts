import Doc, { TransformationResult } from "../document/doc";
import Node from "../document/node";
import { DeleteSelectionAction } from "../actions/input";
import Selection from "../selection";

export default function (doc: Doc, action: DeleteSelectionAction): TransformationResult {

  const { firstNode, lastNode, firstOffset, lastOffset } = action.selection;

  if (firstNode === lastNode) {
    const newTextNode = firstNode.removeString(firstOffset, lastOffset);
    const newDoc = doc.replaceNode(firstNode, newTextNode);
    const newSelection = Selection.caret(newTextNode, firstOffset);
    return { doc: newDoc, selection: newSelection };
  }

  const nodesHaveSameParent = firstNode.parent() === lastNode.parent();
  const lastText = lastNode.removeString(0, lastOffset).text;
  const newFirstNode = firstNode.removeString(firstOffset).appendString(lastText);
  const encapsulatedNodes = Node.nodesBetween(firstNode, lastNode);
  const replacedDoc = doc
    .replaceNode(firstNode, newFirstNode)
    .deleteNode(lastNode)
    .deleteNodes(encapsulatedNodes);
  const mergedDoc = nodesHaveSameParent ? replacedDoc : replacedDoc.mergeParents(newFirstNode, lastNode);
  const newSelection = Selection.caret(newFirstNode, firstOffset);

  return { doc: mergedDoc, selection: newSelection };

}
