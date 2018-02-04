import {KeyboardEvent} from "react";
import Selection from '../selection';
import Editor from "../components/editor";

export default async function handleBeforeInput(editor: Editor, e: KeyboardEvent<Node> & { data: string }) {
  e.preventDefault();
  const selectionJson = Selection.getUserSelection().toJson();
  const action = { type: 'input', selection: selectionJson, str: e.data };
  const { doc, selection } = await editor.core.actions.dispatch(action);
  editor.setState(() => ({ nodes: doc.children() }));
  if (selection) Selection.setCaret(selection.focusNode, selection.focusOffset);
}