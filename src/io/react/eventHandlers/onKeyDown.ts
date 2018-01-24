import {KeyboardEvent} from "react";
import Selection from '../selection';

export default async function handleKeyDown({ setState, core }: EventHandlerInterface, e: KeyboardEvent<Node>) {
  e.preventDefault();
  const selection = Selection.getUserSelection().toJson();
  const action = { type: 'input', selection, str: e.key };
  const { doc, selection: { focusNode, focusOffset } } = await core.actions.dispatch(action);
  await setState({ nodes: doc.nodes });
  Selection.setCaret(focusNode, focusOffset);
}