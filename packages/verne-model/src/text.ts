export interface TextAttrs {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export default class Text {
  public content: string;
  public attrs: TextAttrs = {};
}
