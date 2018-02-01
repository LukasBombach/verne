import {MouseEvent} from "react";
import Selection from '../selection';
import WriteSelection from '../../../selection';
import Editor from "../components/editor";

export default async function handleOnClick(editor: Editor, e: MouseEvent<Node>) {
  const selection = WriteSelection.fromJson(Selection.getUserSelection().toJson());
  console.log(selection.getContainedNodes());
  // console.log(anchorNode, focusNode);
  // console.log('anchorNode comparePositionWith focusNode', anchorNode.comparePositionWith(focusNode));
}