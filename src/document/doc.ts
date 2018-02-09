import Node from "./node";
import NodeMap from "./node_map";

export default class Doc {

  private nodeMap: NodeMap;

  constructor(nodeMap: NodeMap = new NodeMap()) {
    this.nodeMap = nodeMap;
  }

  getChildren(node: Node): Node[] {
    const entry = this.nodeMap.get(node);
    return entry ? entry.children : null;
  }

  replaceNode(node: Node, newNode: Node): Doc {
    return this.replaceNodes([node], [newNode]);
  }

  deleteNode(node: Node): Doc {
    return this.deleteNodes([node])
  }

  replaceNodes(nodes: Node[], newNodes: Node[]): Doc {
    const nodeMap = this.nodeMap.clone();
    nodes.forEach((node, index) => nodeMap.replace(node, newNodes[index]));
    return new Doc(nodeMap);
  }

  deleteNodes(nodes: Node[]): Doc {
    const nodeMap = this.nodeMap.clone();
    nodes.forEach(node => nodeMap.remove(node));
    return new Doc(nodeMap);
  }

}
