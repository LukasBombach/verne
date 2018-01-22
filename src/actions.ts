import WriteEditor from "./write_editor";

interface ActionHandlers {
  [key:string]: Function;
}

export default class Actions {

  private editor: WriteEditor;
  private actionHandlers: ActionHandlers = {};
  private middlewares: Function[] = [];

  constructor(editor: WriteEditor) {
    this.editor = editor;

    this.middlewares = [
      (editor: WriteEditor) => (next: Function) => (action: any) => { console.log('got', action, 'giving a');       next('a'); },
      (editor: WriteEditor) => (next: Function) => (action: any) => { console.log('got', action, 'giving b');       next('b'); },
      (editor: WriteEditor) => (next: Function) => (action: any) => { console.log('got', action, 'giving c');       next('c'); },
      (editor: WriteEditor) => (next: Function) => (action: any) => { console.log('got', action, 'giving d', next); next('d'); },
    ];

    const composedMiddlewares = this.composeMiddlewares();

    const result = composedMiddlewares(
      (action: any) => { console.log('got', action, 'terminating'); }
    );

    console.log('result(\'action\')', result('action'));
  }

  public async dispatch(action: any): Promise<Actions> {
    // console.log(action);
    // const actionAfterMiddlewares = await this.composeMiddlewares(action);
    // await this.handle(actionAfterMiddlewares);
    return this;
  }

  public registerActionHandler(actionName: string, handler: Function): Actions {
    this.actionHandlers[actionName] = handler;
    return this;
  }

  private composeMiddlewares(): Function {
    const chain = this.middlewares.map(middleware => middleware(this.editor));
    return chain.reduce((a, b) => (...args: any[]) => a(b(...args)));
  }

  // private composeMiddlewares(middlewares: Function[]): Function {
  //   if (middlewares.length === 0) {
  //     return (arg: any) => arg
  //   }
  //   if (middlewares.length === 1) {
  //     return middlewares[0]
  //   }
  //   return middlewares.reduce((a, b) => (...args: any[]) => a(b(...args)))
  // }

  private async handle(action: any): Promise<Actions> {
    const handler = this.actionHandlers[action.type];
    if (handler) {
      await handler(action);
    } else {
      console.warn(`No handler or action ${action.type}`);
    }
    return this;
  }

}
