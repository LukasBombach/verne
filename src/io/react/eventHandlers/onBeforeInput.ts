import {KeyboardEvent} from "react";
import Selection from '../selection';
import Editor from "../components/editor";

// todo what is the proper type for "e"?
export default async function handleBeforeInput(editor: Editor, e: KeyboardEvent<Node> & { data: string }) {
  e.preventDefault();
  const selectionJson = Selection.getUserSelection().toJson();
  const action = { type: 'input', selection: selectionJson, str: e.data };
  const { doc, selection } = await editor.core.actions.dispatch(action);
  editor.setState(() => ({ doc }));
  if (selection) Selection.setCaret(selection.focusNode, selection.focusOffset);
}