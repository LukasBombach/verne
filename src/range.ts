import TextNode from "./document/text";
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

  public static fromCaret(selection: Selection, spanBy: number = 0): Range {
    // const { node, offset } = selection.focusNode.walk({ startOffset: selection.focusOffset, characters: spanBy });
    return new Range(selection.focusNode, selection.focusNode, selection.focusOffset, selection.focusOffset);
  }

  // moveStartBy(numChars: number): Range {
  //   if (numChars < 0 && this.startOffset - numChars >= 0) this.startOffset -= numChars;
  //   if (numChars < 0 && this.startOffset - numChars < 0) return this; // todo oh shit
  //   return this;
  // }
  // moveEndBy(numChars: number): Range {
  //   return this;
  // }

  constructor(startNode: TextNode, endNode: TextNode, startOffset: number, endOffset: number) {
    const switchNodes = false; // startNode.precedes(endNode);
    const switchOffsets = false; // startNode === endNode && startOffset > endOffset;
    this.startNode = switchNodes ? startNode : endNode;
    this.endNode = switchNodes ? endNode : startNode;
    this.startOffset = switchOffsets ? endOffset : startOffset;
    this.endOffset = switchOffsets ? startOffset :endOffset ;
  }

}