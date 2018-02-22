import Block from '../document/block';
import Text from '../document/text';
import NodeMap from "../document/node_map";
import Node from "../document/node";

interface TagAttributeMap {
  [key: string]: string;
}

export default class DomParser {

  static blockTags: string[] = ['p', 'ul', 'ol', 'li', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'];

  static tagAttributeMap: TagAttributeMap = {
    strong: 'bold',
    b: 'bold',
    em: 'italic',
    i: 'italic',
    u: 'underline',
    del: 'del',
  };

  static getNodeMapFor(element: Element): NodeMap {
    const nodeMap = new NodeMap();
    nodeMap.setChildren(nodeMap.rootNode, DomParser.getChildrenAndAddToNodeMap(nodeMap, element, nodeMap.rootNode));
    return nodeMap;
  }

  static getChildrenAndAddToNodeMap(nodeMap: NodeMap, element: Element, parent: Node, attrs: string[] = []): Node[] {
    const children: Node[] = [];
    [...element.childNodes].forEach((childNode: Element) => {
      if (DomParser.isBlockNode(childNode)) {
        const block = new Block(childNode.tagName.toLowerCase());
        nodeMap.set(block, parent, DomParser.getChildrenAndAddToNodeMap(nodeMap, childNode, block, attrs));
        children.push(block);
      }
      if (DomParser.isTextNodeWithContents(childNode)) {
        const text = new Text(childNode.nodeValue, attrs);
        nodeMap.set(text, parent, []);
        children.push(text);
      }
      if (DomParser.isAttributeNode(childNode)) {
        const newAttrs = [...attrs, DomParser.getAttr(childNode)];
        children.push(...DomParser.getChildrenAndAddToNodeMap(nodeMap, childNode, parent, newAttrs));
      }
    });
    return children;
  }

  static isBlockNode(domNode: Element): boolean {
    return domNode.tagName && DomParser.blockTags.indexOf(domNode.tagName.toLowerCase()) !== -1;
  }

  static isTextNodeWithContents(domNode: Element): boolean {
    return domNode.nodeType === 3 && /[^\t\n\r ]/.test(domNode.textContent);
  }

  static isAttributeNode(domNode: Element): boolean {
    const tagName = domNode.tagName ? domNode.tagName.toLowerCase() : null;
    return !!(tagName && DomParser.tagAttributeMap[tagName]);
  }

  static getAttr(element: Element): string {
    return DomParser.tagAttributeMap[element.tagName.toLowerCase()];
  }

}
