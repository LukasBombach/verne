import WriteEditor from "./write_editor";
import Doc from "./document/doc";
import Selection from "./selection";
import middlewares from './middleware';

export interface ActionResult {
  doc: Doc;
  selection: Selection
}

export default class Actions {

  private editor: WriteEditor;
  private composedMiddlewares: Function = this.composeMiddlewares(middlewares);

  constructor(editor: WriteEditor) {
    this.editor = editor;
  }

  public async dispatch(action: any): Promise<ActionResult> {
    const actionAfterMiddlewares = await this.applyMiddlewares(action);
    return await this.applyAction(actionAfterMiddlewares);
  }

  private applyMiddlewares(originalAction: any): Promise<any> {
    return new Promise(resolve => this.composedMiddlewares((action: any) => { resolve(action); })(originalAction));
  }

  private async applyAction(action: any): Promise<ActionResult> {
    const { doc, selection } = await this.editor.doc.transform(action);
    this.editor.doc = doc;
    return { doc, selection };
  }

  private composeMiddlewares(middlewares: Function[]): Function {
    if (middlewares.length === 0) return (arg: any) => arg;
    if (middlewares.length === 1) return middlewares[0]();
    return middlewares
      .map(middleware => middleware(this.editor))
      .reduce((a, b) => (...args: any[]) => a(b(...args)))();
  }

}
