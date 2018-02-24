import WriteEditor from "./verne";
import Doc from "./document/doc";
import Selection from "./selection";
import middlewares from './middleware';

export interface ActionResult {
  doc: Doc;
  selection: Selection
}

export default class Actions {

  private editor: WriteEditor;
  private composedMiddlewares: Function;

  constructor(editor: WriteEditor) {
    this.composedMiddlewares = this.composeMiddlewares(middlewares, editor);
    this.editor = editor;
  }

  public dispatch(originalAction: any): Promise<ActionResult> {
    return new Promise(resolve => this.composedMiddlewares(async (finalAction: any) => {
      const { doc, selection } = await this.editor.doc.transform(finalAction);
      this.editor.doc = doc;
      resolve({ doc, selection });
      return { doc, selection };
    })(originalAction));
  }

  private composeMiddlewares(middlewares: Function[], editor: WriteEditor): Function {
    if (middlewares.length === 0) return (arg: any) => arg;
    if (middlewares.length === 1) return middlewares[0];
    return middlewares
      .map(middleware => middleware(editor))
      .reduce((a, b) => (...args: any[]) => a(b(...args)));
  }

}
