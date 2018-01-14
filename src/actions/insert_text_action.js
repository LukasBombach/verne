export default class InsertTextAction {

  constructor(text = '', attrs = []) {
    this.text = text;
    this.attrs = attrs;
    Object.freeze(this);
  }

}
