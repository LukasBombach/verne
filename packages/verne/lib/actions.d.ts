import WriteEditor from "./verne";
import Doc from "./document/doc";
import Selection from "./selection";
export interface ActionResult {
    doc: Doc;
    selection: Selection;
}
export default class Actions {
    private editor;
    private composedMiddlewares;
    constructor(editor: WriteEditor);
    dispatch(originalAction: any): Promise<ActionResult>;
    private composeMiddlewares(middlewares, editor);
}
