import TextNode from "./document/text_node";

export interface SelectionJson {
  anchorNode: TextNode;
  focusNode: TextNode;
  anchorOffset: number;
  focusOffset: number;
}

export default class Selection {

  public anchorNode: TextNode;
  public focusNode: TextNode;
  public anchorOffset: number;
  public focusOffset: number;

  public static caret(node: TextNode, offset: number): Selection {
    return new Selection(node, node, offset, offset);
  }

  constructor(anchorNode: TextNode, focusNode: TextNode, anchorOffset: number, focusOffset: number) {
    this.anchorNode = anchorNode;
    this.focusNode = focusNode;
    this.anchorOffset = anchorOffset;
    this.focusOffset = focusOffset;
  }

  public isCollapsed() {
    return this.anchorNode === this.focusNode && this.anchorOffset === this.focusOffset;
  }

  public toJson(): SelectionJson {
    return {
      anchorNode: this.anchorNode,
      focusNode: this.focusNode,
      anchorOffset: this.anchorOffset,
      focusOffset: this.focusOffset,
    }
  }


}