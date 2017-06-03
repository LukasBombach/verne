// import Doc from './doc';
import BlockNode from './block_node';
import TextNode from './text_node';

export default class Parser {

  static blockTags = ['p', 'ul', 'ol', 'li', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'];

  static tagAttributeMap = {
    strong: 'bold',
    b: 'bold',
    em: 'italic',
    i: 'italic',
    u: 'underline',
    del: 'del',
  };

  static parse(el) {
    return Parser.getChildrenFor(el);
    // return new Doc(el, Parser.getChildrenFor(el));
  }

  static getChildrenFor(domNode, attrs = [], parent) {
    let nodeList = [];
    [].forEach.call(domNode.childNodes, (childNode) => {
      if (Parser.isBlockNode(childNode)) nodeList.push(Parser.getBlockNode(childNode, attrs, parent));
      else if (Parser.isTextNodeWithContents(childNode)) nodeList.push(Parser.getTextNode(childNode, attrs, parent));
      else if (Parser.isAttributeNode(childNode)) nodeList = [...nodeList, ...this.getChildrenFor(childNode, [...attrs, Parser.tagAttributeMap[childNode.tagName.toLowerCase()]], parent)];
    });
    return nodeList;
  }

  static isBlockNode(domNode) {
    return domNode.tagName && Parser.blockTags.indexOf(domNode.tagName.toLowerCase()) !== -1;
  }

  static isTextNodeWithContents(node) {
    return node.nodeType === Node.TEXT_NODE && /[^\t\n\r ]/.test(node.textContent);
  }

  static isAttributeNode(domNode) {
    const attributeMap = Parser.tagAttributeMap;
    const tagName = domNode.tagName ? domNode.tagName.toLowerCase() : null;
    return !!(tagName && attributeMap[tagName]);
  }

  static getBlockNode(domNode, attrs = [], parent) {
    const tagName = domNode.tagName.toLowerCase();
    const children = Parser.getChildrenFor(domNode, attrs);
    return new BlockNode(tagName, parent, children);
  }

  static getTextNode(node, attrs = [], parent) {
    return new TextNode(node.nodeValue, parent, attrs);
  }

}
