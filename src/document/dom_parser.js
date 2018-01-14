import BlockNode from './block_node';
import TextNode from './text_node';

export default class DomParser {

  static getChildrenFor(domNode, attrs = [], parent = null) {
    let nodeList = [];
    [].forEach.call(domNode.childNodes, (childNode) => {
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

  static isBlockNode(domNode) {
    return domNode.tagName && DomParser.blockTags.indexOf(domNode.tagName.toLowerCase()) !== -1;
  }

  static isTextNodeWithContents(domNode) {
    return domNode.nodeType === Node.TEXT_NODE && /[^\t\n\r ]/.test(domNode.textContent);
  }

  static isAttributeNode(domNode) {
    const attributeMap = DomParser.tagAttributeMap;
    const tagName = domNode.tagName ? domNode.tagName.toLowerCase() : null;
    return !!(tagName && attributeMap[tagName]);
  }

  static getBlockNode(domNode, attrs = [], parent) {
    const tagName = domNode.tagName.toLowerCase();
    const children = DomParser.getChildrenFor(domNode, attrs);
    return new BlockNode(tagName, parent, children);
  }

  static getTextNode(domNode, attrs = [], parent) {
    return new TextNode(domNode.nodeValue, parent, attrs);
  }

}


DomParser.blockTags = ['p', 'ul', 'ol', 'li', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'];

DomParser.tagAttributeMap = {
  strong: 'bold',
  b: 'bold',
  em: 'italic',
  i: 'italic',
  u: 'underline',
  del: 'del',
};

