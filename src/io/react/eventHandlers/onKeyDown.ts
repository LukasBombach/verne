import {KeyboardEvent} from "react";
import Selection from '../selection';
import {EventHandlerInterface} from "../components/editor";

export default async function handleKeyDown({ setState, core }: EventHandlerInterface, e: KeyboardEvent<Node>) {
  e.preventDefault();
  const selectionJson = Selection.getUserSelection().toJson();
  const action = { type: 'input', selection: selectionJson, str: e.key };
  const { doc, selection } = await core.actions.dispatch(action);
  setState(() => ({ nodes: doc.nodes }));
  if (selection) Selection.setCaret(selection.focusNode, selection.focusOffset);
}