import TextNode from "./document/text_node";
import Selection from "./selection";

export default class Range {

  public startNode: TextNode;
  public endNode: TextNode;
  public startOffset: number;
  public endOffset: number;

  // todo focus* and anchor* must switch if focus node precedes anchor node
  public static fromSelection(selection: Selection): Range {
    const startNode = selection.anchorNode;
    const endNode = selection.focusNode;
    const startOffset = selection.anchorOffset;
    const endOffset = selection.focusOffset;
    return new Range(startNode, endNode, startOffset, endOffset);
  }

  public static fromCaret(selection: Selection, span: number = 0): Range {
    const startNode = selection.focusNode;
    const endNode = selection.focusNode;
    const startOffset = selection.focusOffset;
    const endOffset = selection.focusOffset;
    const range = new Range(startNode, endNode, startOffset, endOffset);
    return range;
  }

  constructor(startNode: TextNode, endNode: TextNode, startOffset: number, endOffset: number) {
    const switchNodes = startNode.precedes(endNode);
    const switchOffsets = startNode === endNode && startOffset > endOffset;
    this.startNode = switchNodes ? startNode : endNode;
    this.endNode = switchNodes ? endNode : startNode;
    this.startOffset = switchOffsets ? endOffset : startOffset;
    this.endOffset = switchOffsets ? startOffset :endOffset ;
  }

}