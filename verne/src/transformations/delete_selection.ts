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

  let newDoc, newFirstNode,newLastNode, newSelection;

  const nodesHaveSameParent = firstNode.parent() === lastNode.parent();
  const encapsulatedNodes = Node.nodesBetween(firstNode, lastNode);

  newFirstNode = firstNode.removeString(firstOffset);
  newLastNode = lastNode.removeString(0, lastOffset);

  if (firstNode.attrsEqual(lastNode)) {
    newFirstNode = newFirstNode.appendString(lastNode.text);
    newDoc = doc
      .replaceNode(firstNode, newFirstNode)
      .deleteNode(lastNode);
  } else {
    newDoc = doc
      .replaceNodes([firstNode, lastNode], [newFirstNode, newLastNode])
  }

  newDoc = newDoc.deleteNodes(encapsulatedNodes);
  newDoc = nodesHaveSameParent ? newDoc : newDoc.mergeParents(newFirstNode, lastNode);
  newSelection = Selection.caret(newFirstNode, firstOffset);

  return { doc: newDoc, selection: newSelection };

}
