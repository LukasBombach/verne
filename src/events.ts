import InsertTextAction from './actions/insert_text_action';
import WriteEditor from "./write_editor";

export default class Events {

  private editor: WriteEditor;

  constructor(editor: WriteEditor) {
    this.editor = editor;
  }

  // listen() {
  //   this.editor.getEl().addEventListener('input', e => this.handleInput(e), false);
  // }

  handleInput(e: Event) {
    e.preventDefault();
    console.log(e)
    // const insertTextAction = new InsertTextAction(e.data);
    // this.editor.actions.dispatch(insertTextAction);
  }

}
