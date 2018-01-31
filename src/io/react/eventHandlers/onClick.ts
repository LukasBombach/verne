import {MouseEvent} from "react";
import Selection from '../selection';
import Editor from "../components/editor";

export default async function handleOnClick(editor: Editor, e: MouseEvent<Node>) {
  const { focusNode, anchorNode } = Selection.getUserSelection();
  console.log('focusNode precedes anchorNode', focusNode.precedes(anchorNode));
  console.log('anchorNode succeeds focusNode', anchorNode.succeeds(focusNode));
}