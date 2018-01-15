import WriteEditor from "./write_editor";

export default class Actions {

  private editor: WriteEditor;
  private listeners: Function[];

  constructor(editor: WriteEditor) {
    this.editor = editor;
    this.listeners = [];
  }

  async dispatch(action: any): Promise<Actions> {
    for (const listener of this.listeners) {
      await listener(action);
    }
    return this
  }

  listen(callback: Function): Actions {
    this.listeners.push(callback);
    return this
  }

}
