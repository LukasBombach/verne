import TextNode from "../../document/text_node";
import nodeMap from './node_map';

export default class Selection {

  public anchorNode: TextNode;
  public focusNode: TextNode;
  public anchorOffset: number;
  public focusOffset: number;

  static getUserSelection(): Selection {
    const nativeSelection = window.getSelection();
    const anchorNode = nodeMap.get(nativeSelection.anchorNode);
    const focusNode = nodeMap.get(nativeSelection.focusNode);
    const anchorOffset = nativeSelection.anchorOffset;
    const focusOffset = nativeSelection.focusOffset;
    return new Selection(anchorNode, focusNode, anchorOffset, focusOffset);
  }

  constructor(anchorNode: TextNode, focusNode: TextNode, anchorOffset: number, focusOffset: number) {
    this.anchorNode = anchorNode;
    this.focusNode = focusNode;
    this.anchorOffset = anchorOffset;
    this.focusOffset = focusOffset;
  }
}