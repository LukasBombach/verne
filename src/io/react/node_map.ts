import TextNode from "../../document/text";

export default class NodeMap {

  private static map: Map<Node, TextNode> = new Map();

  public static getTextNode(domNode: Node): TextNode {
    return NodeMap.map.get(domNode) || null;
  }

  public static getDomNode(textNode: TextNode): Node {
    const entries = NodeMap.map.entries();
    for (const entry of entries) {
      if (entry[1].id() === textNode.id()) return entry[0];
    }
    return null;
  }

  public static set(key: Node, val: TextNode): NodeMap {
    NodeMap.map.set(key, val);
    return this;
  }

  public static delete(key: Node): NodeMap {
    NodeMap.map.delete(key);
    return this;
  }

};