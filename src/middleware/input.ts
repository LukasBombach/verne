import {InputAction, InsertTextAction, TYPE_INPUT} from "../actions/input";

export default () => (next: Function) => (action: InputAction) => {

  const { type, selection, str} = action;

  console.log('input       ', action);

  if (type !== TYPE_INPUT) {
    return next(action);
  }

  if (['Meta', 'Control', 'Shift', 'Alt'].indexOf(str) !== -1) {
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

  next({ type: 'insert_text', selection, str });

}
