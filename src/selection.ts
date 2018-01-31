import TextNode from "./document/text";
import Node from "./document/node";

export interface SelectionJson {
  anchorNode: TextNode;
  focusNode: TextNode;
  anchorOffset: number;
  focusOffset: number;
}

interface WalkResult {
  node: TextNode;
  offset: number;
}

export interface ContainedNodes {
  firstNode: TextNode;
  lastNode: TextNode;
  firstOffset: number;
  lastOffset: number;
  containedNodes: Node[];
}

export default class Selection {

  public focusNode: TextNode;
  public anchorNode: TextNode;
  public focusOffset: number;
  public anchorOffset: number;

  static caret(node: TextNode, offset: number): Selection {
    return new Selection(node, node, offset, offset);
  }

  static fromJson({ anchorNode, focusNode, anchorOffset, focusOffset }: SelectionJson) {
    return new Selection(anchorNode, focusNode, anchorOffset, focusOffset);
  }

  constructor(anchorNode: TextNode, focusNode: TextNode, anchorOffset: number, focusOffset: number) {
    this.focusNode = focusNode;
    this.anchorNode = anchorNode;
    this.focusOffset = focusOffset;
    this.anchorOffset = anchorOffset;
  }

  isCollapsed() {
    return this.anchorNode === this.focusNode && this.anchorOffset === this.focusOffset;
  }

  moveFocus(numChars: number): Selection {
    const { node, offset} = Selection.walkBy(this.focusNode, this.focusOffset, numChars);
    this.focusNode = node;
    this.focusOffset = offset;
    return this;
  }

  moveAnchor(numChars: number): Selection {
    const { node, offset} = Selection.walkBy(this.anchorNode, this.anchorOffset, numChars);
    this.anchorNode = node;
    this.anchorOffset = offset;
    return this;
  }

  getContainedNodes(): ContainedNodes {
    const anchorNodePosition = this.anchorNode.comparePositionWith(this.focusNode);
    const firstNode = anchorNodePosition === -1 ? this.anchorNode : this.focusNode;
    const lastNode = anchorNodePosition === -1 ? this.focusNode : this.anchorNode;
    const firstOffset = anchorNodePosition === -1 ? this.anchorOffset : this.focusOffset;
    const lastOffset = anchorNodePosition === -1 ? this.focusOffset : this.anchorOffset;
    const containedNodes = Node.nodesBetween(firstNode, lastNode);
    return { firstNode, lastNode, firstOffset, lastOffset, containedNodes };
  }

  private static walkBy(node: TextNode, startOffset: number, numChars: number): WalkResult {
    return numChars < 0 ? Selection.walkBackwardsBy(node, startOffset, Math.abs(numChars)) : Selection.walkForwardsBy(node, startOffset, numChars);
  }

  private static walkBackwardsBy(node: TextNode, startOffset: number, numChars: number): WalkResult {
    if (numChars < 0) throw new Error(`numChars must be greater than 0. You gave ${numChars}`);
    if (startOffset - numChars >= 0) return { node, offset: startOffset - numChars };
    const prevText = node.prevTextLeaf();
    return Selection.walkBackwardsBy(prevText, prevText.text().length, numChars - startOffset);
  }

  private static walkForwardsBy(node: TextNode, startOffset: number, numChars: number): WalkResult {
    if (numChars < 0) throw new Error(`numChars must be greater than 0. You gave ${numChars}`);
    const text = node.text();
    const length = text.length;
    if (startOffset + numChars < text.length) return { node, offset: startOffset + numChars };
    const nextText = node.nextTextLeaf();
    return Selection.walkBackwardsBy(nextText, 0, numChars - length);
  }

}