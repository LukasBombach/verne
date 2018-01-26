import {DeleteRangeAction, InputAction, InsertTextAction, TYPE_INPUT} from "../actions/input";
import Range from '../range';
import {debug} from "../config";
import Selection from "../selection";

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
    const range = selection.isCollapsed() ? Range.fromCaret(selection, -1) : Range.fromSelection(selection);
    const deleteRangeAction: DeleteRangeAction = { type: 'delete_range', range };
    return next(deleteRangeAction);
  }

  if (str === 'Delete') {
    console.warn('This should handle Delete input');
    return;
  }

  const insertTextAction: InsertTextAction = { type: 'insert_text', selection, str };
  return next(insertTextAction);

}
