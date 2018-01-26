import Selection from "../selection";
import Range from "../range";

export const TYPE_INPUT = 'input';
export const TYPE_INSERT_TEXT = 'insert_text';
export const DELETE_RANGE = 'delete_range';

export interface InputAction {
  type: 'input';
  selection: Selection;
  str: string
}

export interface InsertTextAction {
  type: 'insert_text';
  selection: Selection;
  str: string
}

export interface DeleteRangeAction {
  type: 'delete_range';
  range: Range;
}
