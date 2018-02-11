import {KeyboardEvent} from "react";
import Selection from '../selection';
import Editor from "../components/editor";

const keysToHandle = ['Backspace', 'Delete'];

export default async function handleKeyDown(editor: Editor, e: KeyboardEvent<Node>) {
  if (keysToHandle.indexOf(e.key) !== -1) {
    e.preventDefault();
    const selectionJson = Selection.getUserSelection().toJson();
    const action = { type: 'input', selection: selectionJson, str: e.key };
    const { doc, selection } = await editor.editor.actions.dispatch(action);
    editor.setState(() => ({ doc }));
    if (selection) Selection.setCaret(selection.focusNode, selection.focusOffset);
  }
}