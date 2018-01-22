import WriteEditor from "./write_editor";

interface ActionHandlers {
  [key:string]: Function;
}

export default class Actions {

  private editor: WriteEditor;
  private actionHandlers: ActionHandlers = {};
  private middlewares: Function[] = [];
  private composedMiddlewares: Function;

  constructor(editor: WriteEditor) {
    this.editor = editor;
    this.middlewares = [
      (editor: WriteEditor) => (next: Function) => (action: any) => { console.log('got', action, 'giving a');       next('a'); },
      (editor: WriteEditor) => (next: Function) => (action: any) => { console.log('got', action, 'giving b');       next('b'); },
      (editor: WriteEditor) => (next: Function) => (action: any) => { console.log('got', action, 'giving c');       next('c'); },
      (editor: WriteEditor) => (next: Function) => (action: any) => { console.log('got', action, 'giving d', next); next('d'); },
    ];
    this.composedMiddlewares = this.composeMiddlewares(this.middlewares);
  }

  public async dispatch(action: any): Promise<Actions> {
    const actionAfterMiddlewares = await this.applyMiddlewares(action);
    await this.handle(actionAfterMiddlewares);
    return this;
  }

  public registerActionHandler(actionName: string, handler: Function): Actions {
    this.actionHandlers[actionName] = handler;
    return this;
  }

  private applyMiddlewares(action: any): Promise<any> {
    return new Promise(resolve => this.composedMiddlewares((action: any) => resolve(action))(action))
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

  private handle(action: any): Actions {
    const handler = this.actionHandlers[action.type];
    if (handler) {
      handler(action);
    } else {
      console.warn(`No handler or action ${action.type}`);
    }
    return this;
  }

}
