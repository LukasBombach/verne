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

export default class Selection {

  private _anchorNode: TextNode;
  private _focusNode: TextNode;
  private _anchorOffset: number;
  private _focusOffset: number;
  private _nodeOrder: number;

  static caret(node: TextNode, offset: number): Selection {
    return new Selection(node, node, offset, offset);
  }

  static fromJson({ anchorNode, focusNode, anchorOffset, focusOffset }: SelectionJson) {
    return new Selection(anchorNode, focusNode, anchorOffset, focusOffset);
  }

  // todo the getter properties in these class are inconsistent with the getter functions in the Node class
  constructor(anchorNode: TextNode, focusNode: TextNode, anchorOffset: number, focusOffset: number) {
    this._focusNode = focusNode;
    this._anchorNode = anchorNode;
    this._focusOffset = focusOffset;
    this._anchorOffset = anchorOffset;
  }

  get anchorNode(): TextNode {
    return this._anchorNode;
  }

  get focusNode(): TextNode {
    return this._focusNode;
  }

  get anchorOffset(): number {
    return this._anchorOffset;
  }

  get focusOffset(): number {
    return this._focusOffset;
  }

  get firstNode(): TextNode {
    return this.nodeOrder <= 0 ? this._anchorNode : this._focusNode;
  }

  get lastNode(): TextNode {
    return this.nodeOrder <= 0 ? this._focusNode : this._anchorNode;
  }

  get firstOffset(): number {
    const nodeOrder = this.nodeOrder;
    return nodeOrder === 0 ? Math.min(this._anchorOffset, this._focusOffset) : nodeOrder <= 0 ? this._anchorOffset : this._focusOffset;
  }

  get lastOffset(): number {
    const nodeOrder = this.nodeOrder;
    return nodeOrder === 0 ? Math.max(this._anchorOffset, this._focusOffset) : nodeOrder <= 0 ? this._focusOffset : this._anchorOffset;
  }

  get isCollapsed() {
    return this._anchorNode === this._focusNode && this._anchorOffset === this._focusOffset;
  }

  get containedNodes(): Node[] {
    const firstNode = this.firstNode;
    const lastNode = this.lastNode;
    return [firstNode, ...Node.nodesBetween(firstNode, lastNode), lastNode];
  }

  private get nodeOrder() {
    if (this._nodeOrder === undefined) this._nodeOrder = this._anchorNode.comparePositionWith(this._focusNode);
    return this._nodeOrder;
  }

  moveFocus(numChars: number): Selection {
    const { node, offset} = Selection.walkBy(this._focusNode, this._focusOffset, numChars);
    return new Selection(this.anchorNode, node, this.anchorOffset, offset);
  }

  moveAnchor(numChars: number): Selection {
    const { node, offset} = Selection.walkBy(this._anchorNode, this._anchorOffset, numChars);
    return new Selection(node, this.focusNode, offset, this.focusOffset);
  }

  private static walkBy(node: TextNode, startOffset: number, numChars: number): WalkResult {
    return numChars < 0 ? Selection.walkBackwardsBy(node, startOffset, Math.abs(numChars)) : Selection.walkForwardsBy(node, startOffset, numChars);
  }

  private static walkBackwardsBy(node: TextNode, startOffset: number, numChars: number): WalkResult {
    if (numChars < 0) throw new Error(`numChars must be greater than 0. You gave ${numChars}`);
    if (startOffset - numChars >= 0) return { node, offset: startOffset - numChars };
    const prevText = node.prevTextLeaf();
    return Selection.walkBackwardsBy(prevText, prevText.length, numChars - startOffset);
  }

  private static walkForwardsBy(node: TextNode, startOffset: number, numChars: number): WalkResult {
    if (numChars < 0) throw new Error(`numChars must be greater than 0. You gave ${numChars}`);
    if (startOffset + numChars < node.length) return { node, offset: startOffset + numChars };
    const nextText = node.nextTextLeaf();
    return Selection.walkBackwardsBy(nextText, 0, numChars - node.length);
  }

}