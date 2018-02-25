import Node from "./node";
import NodeMap from "./node_map";
import Selection from "../selection";
export interface TransformationResult {
    doc: Doc;
    selection: Selection;
}
export default class Doc {
    private static nextDocId;
    id: Readonly<number>;
    nodeMap: Readonly<NodeMap>;
    static fromHtml(html: string): Doc;
    static fromElement(element: Element): Doc;
    constructor(nodeMap?: NodeMap);
    children(): Node[];
    replaceNode(node: Node, newNode: Node): Doc;
    deleteNode(node: Node): Doc;
    replaceNodes(nodes: Node[], newNodes: Node[]): Doc;
    deleteNodes(nodes: Node[]): Doc;
    merge(leftNode: Node, rightNode: Node): Doc;
    mergeParents(leftNode: Node, rightNode: Node): Doc;
    transform(action: any): Promise<TransformationResult>;
}
