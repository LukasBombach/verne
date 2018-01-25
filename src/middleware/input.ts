import {InputAction, InsertTextAction, TYPE_INPUT} from "../actions/input";
import {debug} from "../config";

export default () => (next: Function) => (action: InputAction) => {

  const { type, selection, str} = action;

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
    console.warn('This should handle Backspace input')
  }

  if (str === 'Delete') {
    console.warn('This should handle Delete input')
  }

  const insertTextAction: InsertTextAction = { type: 'insert_text', selection, str };
  next(insertTextAction);

}
