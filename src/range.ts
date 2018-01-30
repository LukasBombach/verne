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
    const range = new Range(selection.focusNode, selection.focusNode, selection.focusOffset, selection.focusOffset);
    if (spanBy < 0) range.moveStart(spanBy);
    if (spanBy > 0) range.moveEnd(spanBy);
    return range;
  }

  moveStart(numChars: number = 0): Range {
    // if (startOffset > this.text().length) throw new Error(`startOffset (${startOffset} chars) must not be larger than node's text (${this.text().length} chars)`);
    // let node = this;
    // let remainingChars = numChars + startOffset;
    // while (remainingChars > 0) {
    //
    // }
    // return { node , offset };
    return this;
  }

  moveEnd(numChars: number = 0): Range {
    return this;
  }


  constructor(startNode: TextNode, endNode: TextNode, startOffset: number, endOffset: number) {
    const switchNodes = false; // startNode.precedes(endNode);
    const switchOffsets = false; // startNode === endNode && startOffset > endOffset;
    this.startNode = switchNodes ? startNode : endNode;
    this.endNode = switchNodes ? endNode : startNode;
    this.startOffset = switchOffsets ? endOffset : startOffset;
    this.endOffset = switchOffsets ? startOffset :endOffset ;
  }

}