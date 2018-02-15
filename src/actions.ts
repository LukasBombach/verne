import WriteEditor from "./write_editor";
import Doc from "./document/doc";
import Selection from "./selection";
import middlewares from './middleware';
import { debug } from './config';

export interface ActionResult {
  doc: Doc;
  selection: Selection
}

export default class Actions {

  private editor: WriteEditor;
  private composedMiddlewares: Function;

  constructor(editor: WriteEditor) {
    this.editor = editor;
    this.composedMiddlewares = this.composeMiddlewares(middlewares);
  }

  public dispatch(originalAction: any): Promise<ActionResult> {
    return new Promise(resolve => this.composedMiddlewares(async (finalAction: any) => {
      const { doc, selection } = await this.editor.doc.transform(finalAction);
      this.editor.doc = doc;
      resolve({ doc, selection });
      return { doc, selection };
    })(originalAction));
  }

  private composeMiddlewares(middlewares: Function[]): Function {
    if (middlewares.length === 0) return (arg: any) => arg;
    if (middlewares.length === 1) return middlewares[0];
    return middlewares
      .map(middleware => middleware(this.editor))
      .reduce((a, b) => (...args: any[]) => a(b(...args)));
  }

}
