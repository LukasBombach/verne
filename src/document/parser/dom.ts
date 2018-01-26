import Block from '../block';
import Text from '../text';

interface TagAttributeMap {
  [key: string]: string;
  strong: string;
  b: string;
  em: string;
  i: string;
  u: string;
  del: string;
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

  static getChildrenFor(domNode: Node, attrs: string[] = [], parent: Block = null): Array<Block|Text> {
    let nodeList: Array<Block|Text> = [];
    [].forEach.call(domNode.childNodes, (childNode: Element) => {
      if (DomParser.isBlockNode(childNode)) nodeList.push(DomParser.getBlockNode(childNode, attrs, parent));
      else if (DomParser.isTextNodeWithContents(childNode)) nodeList.push(DomParser.getTextNode(childNode, attrs, parent));
      else if (DomParser.isAttributeNode(childNode)) {
        const newAttrs = [DomParser.tagAttributeMap[childNode.tagName.toLowerCase()], ...attrs];
        const children = this.getChildrenFor(childNode, newAttrs, parent);
        nodeList = [...nodeList, ...children];
      }
    });
    return nodeList;
  }

  static isBlockNode(domNode: Element): boolean {
    return domNode.tagName && DomParser.blockTags.indexOf(domNode.tagName.toLowerCase()) !== -1;
  }

  static isTextNodeWithContents(domNode: Element): boolean {
    return domNode.nodeType === Node.TEXT_NODE && /[^\t\n\r ]/.test(domNode.textContent);
  }

  static isAttributeNode(domNode: Element): boolean {
    const attributeMap = DomParser.tagAttributeMap;
    const tagName = domNode.tagName ? domNode.tagName.toLowerCase() : null;
    return !!(tagName && attributeMap[tagName]);
  }

  static getBlockNode(domNode: Element, attrs: string[] = [], parent: Block) {
    const tagName = domNode.tagName.toLowerCase();
    const children = DomParser.getChildrenFor(domNode, attrs);
    return new Block(tagName, parent, children);
  }

  static getTextNode(domNode: Element, attrs: string[] = [], parent: Block) {
    return new Text(domNode.nodeValue, attrs, parent);
  }

}
