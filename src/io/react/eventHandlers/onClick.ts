import {MouseEvent} from "react";
import Selection from '../selection';
import Editor from "../components/editor";

export default async function handleOnClick(editor: Editor, e: MouseEvent<Node>) {
  const selectionJson = Selection.getUserSelection();
  console.log(selectionJson.focusNode.prevLeaf())
}