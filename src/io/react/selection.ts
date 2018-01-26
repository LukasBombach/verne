import TextNode from "../../document/text";
import NodeMap from './node_map';

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

  static getUserSelection(): Selection {
    const nativeSelection = window.getSelection();
    const anchorNode = NodeMap.getTextNode(nativeSelection.anchorNode);
    const focusNode = NodeMap.getTextNode(nativeSelection.focusNode);
    const anchorOffset = nativeSelection.anchorOffset;
    const focusOffset = nativeSelection.focusOffset;
    return new Selection(anchorNode, focusNode, anchorOffset, focusOffset);
  }

  static setCaret(node: TextNode, offset: number) {
    const domNode = NodeMap.getDomNode(node);
    const nativeSelection = window.getSelection();
    const nativeRange = document.createRange();
    nativeRange.setStart(domNode, offset);
    nativeRange.setEnd(domNode, offset);
    nativeSelection.removeAllRanges();
    nativeSelection.addRange(nativeRange);
  }

  constructor(anchorNode: TextNode, focusNode: TextNode, anchorOffset: number, focusOffset: number) {
    this.anchorNode = anchorNode;
    this.focusNode = focusNode;
    this.anchorOffset = anchorOffset;
    this.focusOffset = focusOffset;
  }

  toJson(): SelectionJson {
    return {
      anchorNode: this.anchorNode,
      focusNode: this.focusNode,
      anchorOffset: this.anchorOffset,
      focusOffset: this.focusOffset,
    }
  }

}