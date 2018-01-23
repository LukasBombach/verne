import TextNode from "../document/text_node";

export default class Selection {

  public anchorNode: TextNode;
  public focusNode: TextNode;
  public anchorOffset: number;
  public focusOffset: number;

  constructor(anchorNode: TextNode, focusNode: TextNode, anchorOffset: number, focusOffset: number) {
    this.anchorNode = anchorNode;
    this.focusNode = focusNode;
    this.anchorOffset = anchorOffset;
    this.focusOffset = focusOffset;
  }

}