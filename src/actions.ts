import WriteEditor from "./write_editor";

interface ActionHandlers {
  [key:string]: Function;
  string: Function;
}

export default class Actions {

  private editor: WriteEditor;
  private actionHandlers: ActionHandlers;

  constructor(editor: WriteEditor) {
    this.editor = editor;
  }

  async dispatch(action: any): Promise<Actions> {
    console.log(action);
    // todo middleware
    await this.handle(action);
    return this;
  }

  async handle(action: any): Promise<Actions> {
    const handler = this.actionHandlers[action.type];
    if (handler) {
      await handler(action);
    } else {
      console.warn(`No handler or action ${action.type}`);
    }
    return this;
  }

  registerActionHandler(actionName: string, handler: Function): Actions {
    this.actionHandlers[actionName] = handler;
    return this;
  }

}
