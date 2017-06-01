import Doc from './doc';
import BlockNode from './block_node';
import TextNode from './text_node';

export default class Parser {

  static blockTags = ['p', 'ul', 'ol', 'li', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'];

  static tagAttributeMap = {
    strong: 'bold', //TextNode.ATTRIBUTES.BOLD,
    b: 'bold',      //TextNode.ATTRIBUTES.BOLD,
    em: 'italic',   //TextNode.ATTRIBUTES.ITALIC,
    i: 'italic',    //TextNode.ATTRIBUTES.ITALIC,
    u: 'underline', //TextNode.ATTRIBUTES.UNDERLINE,
    del: 'del',     //TextNode.ATTRIBUTES.DEL,
  };

  static parse(el) {
    return new Doc(el, Parser.getChildrenFor(el));
  }

  static getChildrenFor(domNode, attributes = [], parent) {
    return [].prototype.map.call(domNode.childNodes, node => {
      if (Parser.isBlockNode(node)) return Parser.getBlockNode(node, attributes, parent);
      else if (Parser.isTextNodeWithContents(node)) return Parser.getTextNode(node, attributes, parent);
      // else if (Parser.isAttributeNode(node)) childNodes = childNodes.concat(Parser.getChildrenFor(node, Parser.addAttributeForNode(attributes, node), parent));
      else return undefined;
    }).filter(node => node !== undefined);
  }

  static isBlockNode(domNode) {
    return domNode.tagName && Parser.blockTags.indexOf(domNode.tagName.toLowerCase()) !== -1;
  }

  static isTextNodeWithContents(node) {
    return node.nodeType === Node.TEXT_NODE && /[^\t\n\r ]/.test(node.textContent);
  }

  static getBlockNode(domNode, attrs = [], parent) {
    const tagName = domNode.tagName.toLowerCase();
    const blockNode = new BlockNode(tagName, parent);
    blockNode.setChildren(Parser.getChildrenFor(domNode, attrs, blockNode));
    return blockNode;
  }

  static getTextNode(node, attrs = [], parent) {
    return new TextNode(node.nodeValue, parent, attrs);
  }

  static isAttributeNode(domNode) {
    const attributeMap = Parser.tagAttributeMap;
    const tagName = domNode.tagName ? domNode.tagName.toLowerCase() : null;
    return !!(tagName && attributeMap[tagName]);
  }

  static addAttributeForNode(attrs = [], node) {
    const attributeMap = Parser.tagAttributeMap;
    const tagName = node.tagName ? node.tagName.toLowerCase() : '';
    attrs = attrs.slice(0);
    if (attributeMap[tagName] && attrs.indexOf(tagName) === -1) attrs.push(attributeMap[tagName]);
    return attrs;
  }

}
