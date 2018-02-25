import WriteEditor from "../verne";
export default class Node {
    private static nextNodeId;
    static editor: WriteEditor;
    id: Readonly<number>;
    originId: Readonly<number>;
    constructor(originId?: number);
    readonly index: number;
    readonly path: Node[];
    parent(condition?: (node: Node) => boolean): Node;
    children(condition?: (node: Node) => boolean): Node[];
    prev(condition?: (node: Node) => boolean): Node;
    next(condition?: (node: Node) => boolean): Node;
    siblings(condition?: (node: Node) => boolean): Node[];
    prevSiblings(condition?: (node: Node) => boolean): Node[];
    nextSiblings(condition?: (node: Node) => boolean): Node[];
    nextSiblingsUntil(condition?: (node: Node) => boolean): Node[];
    pathUntil(condition?: (node: Node) => boolean): Node[];
    prevLeaf(condition?: (node: Node) => boolean): Node;
    nextLeaf(condition?: (node: Node) => boolean): Node;
    firstLeaf(condition?: (node: Node) => boolean): Node;
    lastLeaf(condition?: (node: Node) => boolean): Node;
    comparePositionWith(that: Node): number;
    static nodesBetween(firstNode: Node, lastNode: Node): Node[];
    private static closestParents(a, b);
}
