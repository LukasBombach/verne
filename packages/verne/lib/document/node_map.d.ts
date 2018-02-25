import Node from "./node";
export interface Map {
    [key: string]: MapEntry;
}
export interface MapEntry {
    parent: Node;
    children: Node[];
}
export default class NodeMap {
    rootNode: Readonly<Node>;
    private map;
    constructor(map?: Map, rootNode?: Node);
    get(node: Node): MapEntry;
    getRoot(): MapEntry;
    getParent(node: Node): Node;
    getChildren(node: Node): Node[];
    set(node: Node, parent?: Node, children?: Node[]): this;
    setChildren(node: Node, children?: Node[]): this;
    replace(currentNode: Node, newNode: Node): this;
    remove(node: Node): this;
    merge(leftNode: Node, rightNode: Node): this;
    clone(): NodeMap;
    private replaceChildInParent(parent, currentNode, newNode);
    private removeChildFromParent(parent, child);
    private removeRecursively(nodes);
}
