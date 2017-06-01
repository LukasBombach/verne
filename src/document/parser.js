import Doc from './doc';

export default class Parser {

  static blockTags = ['p', 'ul', 'ol', 'li', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'];

  static tagAttributeMap = {
    strong: TextNode.ATTRIBUTES.BOLD,
    b: TextNode.ATTRIBUTES.BOLD,
    em: TextNode.ATTRIBUTES.ITALIC,
    i: TextNode.ATTRIBUTES.ITALIC,
    u: TextNode.ATTRIBUTES.UNDERLINE,
    del: TextNode.ATTRIBUTES.DEL,
  };

  static parse(el) {
    return new Doc(el, Parser.getChildrenFor(el));
  }

  static getChildrenFor(domNode, attributes = [], parent) {
    return [].prototype.map.call(domNode.childNodes, node => {
      if (Parser.isBlockNode(node)) return Parser.getBlockNode(node, attributes, parent);
      else if (Parser.isTextNodeWithContents(node)) return Parser.getTextNode(node, attributes, parent);
      // else if (Parser.isAttributeNode(node)) childNodes = childNodes.concat(Parser._getChildrenFor(node, Parser.addAttributeForNode(attributes, node), parent));
      else return undefined;
    }).filter(node => node !== undefined);
  }

  static isBlockNode(domNode) {
    return domNode.tagName && Parser.blockTags.indexOf(domNode.tagName.toLowerCase()) !== -1;
  }

  static isTextNodeWithContents(node) {
    return node.nodeType === Node.TEXT_NODE && /[^\t\n\r ]/.test(node.textContent);
  }

  static getBlockNode(domNode, attributes = [], parent) {
    const nodeType = domNode.tagName.toLowerCase();
    const blockNode = new BlockNode(this._type, nodeType, parent);
    blockNode.children = Parser._getChildrenFor(domNode, attributes, blockNode);
    return blockNode;
  }

  static getTextNode(node, attributes = [], parent) {
    return new TextNode(this._type, attributes, node.nodeValue, parent);
  }

  static isAttributeNode(domNode) {
    const attributeMap = Parser.tagAttributeMap;
    const tagName = domNode.tagName ? domNode.tagName.toLowerCase() : null;
    return !!(tagName && attributeMap[tagName]);
  }

  static addAttributeForNode(attributes = [], node) {
    const attributeMap = Parser.tagAttributeMap;
    const tagName = node.tagName ? node.tagName.toLowerCase() : '';
    attributes = attributes.slice(0);
    if (attributeMap[tagName] && attributes.indexOf(tagName) === -1) attributes.push(attributeMap[tagName]);
    return attributes;
  }



}
