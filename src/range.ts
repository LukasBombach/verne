import TextNode from "./document/text";
import Selection from "./selection";

interface WalkResult {
  node: TextNode;
  offset: number;
}

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

  constructor(startNode: TextNode, endNode: TextNode, startOffset: number, endOffset: number) {
    const switchNodes = false; // startNode.precedes(endNode);
    const switchOffsets = false; // startNode === endNode && startOffset > endOffset;
    this.startNode = switchNodes ? startNode : endNode;
    this.endNode = switchNodes ? endNode : startNode;
    this.startOffset = switchOffsets ? endOffset : startOffset;
    this.endOffset = switchOffsets ? startOffset :endOffset ;
  }

  moveStart(numChars: number): Range {
    const { node, offset} = Range.walkBy(this.startNode, this.startOffset, numChars);
    this.startNode = node;
    this.startOffset = offset;
    return this;
  }

  moveEnd(numChars: number): Range {
    const { node, offset} = Range.walkBy(this.endNode, this.endOffset, numChars);
    this.endNode = node;
    this.endOffset = offset;
    return this;
  }

  private static walkBy(node: TextNode, startOffset: number, numChars: number): WalkResult {
    return numChars < 0 ? Range.walkBackwardsBy(node, startOffset, Math.abs(numChars)) : Range.walkForwardsBy(node, startOffset, numChars);
  }

  private static walkBackwardsBy(node: TextNode, startOffset: number, numChars: number): WalkResult {
    if (numChars < 0) throw new Error(`numChars must be greater than 0. You gave ${numChars}`);
    if (startOffset - numChars >= 0) return { node, offset: startOffset - numChars };
    const prevText = node.prevTextLeaf();
    return Range.walkBackwardsBy(prevText, prevText.text().length, numChars - startOffset);
  }

  private static walkForwardsBy(node: TextNode, startOffset: number, numChars: number): WalkResult {
    if (numChars < 0) throw new Error(`numChars must be greater than 0. You gave ${numChars}`);
    const text = node.text();
    const length = text.length;
    if (startOffset + numChars < text.length) return { node, offset: startOffset + numChars };
    const nextText = node.nextTextLeaf();
    return Range.walkBackwardsBy(nextText, 0, numChars - length);
  }

}