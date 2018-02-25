import Selection from "../selection";
export declare const TYPE_INPUT = "input";
export declare const TYPE_INSERT_TEXT = "insert_text";
export declare const DELETE_SELECTION = "delete_selection";
export interface InputAction {
    type: 'input';
    selection: Selection;
    str: string;
}
export interface InsertTextAction {
    type: 'insert_text';
    selection: Selection;
    str: string;
}
export interface DeleteSelectionAction {
    type: 'delete_selection';
    selection: Selection;
}
