import TextNode from "./document/text";
import Node from "./document/node";
export interface SelectionJson {
    anchorNode: TextNode;
    focusNode: TextNode;
    anchorOffset: number;
    focusOffset: number;
}
export default class Selection {
    private _anchorNode;
    private _focusNode;
    private _anchorOffset;
    private _focusOffset;
    private _nodeOrder;
    static caret(node: TextNode, offset: number): Selection;
    static fromJson({anchorNode, focusNode, anchorOffset, focusOffset}: SelectionJson): Selection;
    constructor(anchorNode: TextNode, focusNode: TextNode, anchorOffset: number, focusOffset: number);
    readonly anchorNode: TextNode;
    readonly focusNode: TextNode;
    readonly anchorOffset: number;
    readonly focusOffset: number;
    readonly firstNode: TextNode;
    readonly lastNode: TextNode;
    readonly firstOffset: number;
    readonly lastOffset: number;
    readonly isCollapsed: boolean;
    readonly containedNodes: Node[];
    private readonly nodeOrder;
    moveFocus(numChars: number): Selection;
    moveAnchor(numChars: number): Selection;
    private static walkBy(node, startOffset, numChars);
    private static walkBackwardsBy(node, startOffset, numChars);
    private static walkForwardsBy(node, startOffset, numChars);
}
