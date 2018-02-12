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
    // todo make this logger a middleware like redux-logger please
    if (debug.log.transformations) {
      console.group('%c Log transformation%c %s', 'color: gray; font-weight: lighter;', 'color: inherit;', action.type);
      console.log('%c prev doc: %O', 'color: #9E9E9E;', this.editor.doc);
      console.log('%c action:   %O', 'color: #03A9F4;', action);
      console.log('%c next doc: %O', 'color: #4CAF50;', doc);
      console.groupEnd();
    }
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
