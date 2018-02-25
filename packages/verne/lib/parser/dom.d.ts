import NodeMap from "../document/node_map";
import Node from "../document/node";
export interface TagAttributeMap {
    [key: string]: string;
}
export default class DomParser {
    static blockTags: string[];
    static tagAttributeMap: TagAttributeMap;
    static getNodeMapFor(element: Element): NodeMap;
    static getChildrenAndAddToNodeMap(nodeMap: NodeMap, element: Element, parent: Node, attrs?: string[]): Node[];
    static isBlockNode(domNode: Element): boolean;
    static isTextNodeWithContents(domNode: Element): boolean;
    static isAttributeNode(domNode: Element): boolean;
    static getAttr(element: Element): string;
}
