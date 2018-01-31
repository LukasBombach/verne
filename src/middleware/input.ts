import {DeleteSelectionAction, InputAction, InsertTextAction, TYPE_INPUT} from "../actions/input";
import Selection from "../selection";
import {debug} from "../config";

export default () => (next: Function) => (action: InputAction) => {

  const { type, selection: selectionJson, str} = action;
  const selection = Selection.fromJson(selectionJson);

  if (debug.log.middlewareCalls) console.log('input', action);

  if (type !== TYPE_INPUT) {
    return next(action);
  }

  if (['Meta', 'Control', 'Shift', 'Alt', 'Meta'].indexOf(str) !== -1) {
    return next(action);
  }

  if (/F\d+/.test(str)) {
    return next(action);
  }

  if (str === 'Backspace') {
    if (selection.isCollapsed()) selection.moveFocus(-1);
    const deleteSelectionAction: DeleteSelectionAction = { type: 'delete_selection', selection };
    return next(deleteSelectionAction);
  }

  if (str === 'Delete') {
    if (selection.isCollapsed()) selection.moveFocus(1);
    const deleteSelectionAction: DeleteSelectionAction = { type: 'delete_selection', selection };
    return next(deleteSelectionAction);
  }

  const insertTextAction: InsertTextAction = { type: 'insert_text', selection, str };
  return next(insertTextAction);

}
