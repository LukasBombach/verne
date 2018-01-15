export default class InsertTextAction {

  public text: string;
  public attrs: string[];

  constructor(text: string = '', attrs: string[] = []) {
    this.text = text;
    this.attrs = attrs;
    Object.freeze(this);
  }

}
