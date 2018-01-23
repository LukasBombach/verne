import Selection from "../selection";

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