import Selection from "../selection";

export const TYPE_INPUT = 'input';
export const TYPE_INSERT_TEXT = 'insert_text';

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
