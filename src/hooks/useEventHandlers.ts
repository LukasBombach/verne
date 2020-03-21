import { KeyboardEvent } from "react";
import Document from "../components/Document";

export default function useEventHandlers(
  doc: Document,
  setDoc: (doc: Document) => void
) {
  const selection = window.getSelection();

  async function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    event.stopPropagation();
    event.preventDefault();
    if (!selection) return console.warn("No selection");
    if (!selection.isCollapsed)
      return console.warn("Selection is not collapsed");
    if (!selection.focusNode) return console.warn("No focusNode");
    if (!selection.focusNode.parentElement)
      return console.warn("No parentElement");
    const index = Array.prototype.indexOf.call(
      selection.focusNode.parentElement.childNodes,
      selection.focusNode
    );
    const node = doc.props.nodes[index];
    const offset = selection.focusOffset;
    const str = event.key;
    const newDoc = await doc.keyDown({ node, offset, str });
    setDoc(newDoc);
  }

  return { onKeyDown };
}
