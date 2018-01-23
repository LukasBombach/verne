import WriteEditor from "./write_editor";
import Doc from "./document/doc";
import Selection from "./selection";

interface ActionHandlers {
  [key:string]: Function;
}

export interface ActionResult {
  doc: Doc;
  selection: Selection
}

export default class Actions {

  private editor: WriteEditor;
  private actionHandlers: ActionHandlers = {};
  private middlewares: Function[] = []; // (editor: WriteEditor) => (next: Function) => (action: any) => { console.log('got', action, 'giving a'); next('a'); },
  private composedMiddlewares: Function;

  constructor(editor: WriteEditor) {
    this.editor = editor;
    this.composedMiddlewares = this.composeMiddlewares(this.middlewares);
  }

  public async dispatch(action: any): Promise<any> {
    const actionAfterMiddlewares = await this.applyMiddlewares(action);
    await this.handle(actionAfterMiddlewares);
    return actionAfterMiddlewares;
  }

  public registerActionHandler(actionName: string, handler: Function): Actions {
    this.actionHandlers[actionName] = handler;
    return this;
  }

  private applyMiddlewares(originalAction: any): Promise<any> {
    return new Promise(resolve => this.composedMiddlewares((newAction: any) => resolve(newAction))(originalAction))
  }

  private composeMiddlewares(middlewares: Function[]): Function {
    if (middlewares.length === 0) {
      return (arg: any) => arg;
    }
    if (middlewares.length === 1) {
      return middlewares[0];
    }
    return middlewares
      .map(middleware => middleware(this.editor))
      .reduce((a, b) => (...args: any[]) => a(b(...args)));
  }

  private async handle(action: any): Promise<Actions> {
    const handler = this.actionHandlers[action.type];
    if (handler) {
      await handler(action);
    } else {
      console.warn(`No handler for action ${action.type}`);
    }
    return this;
  }

}
