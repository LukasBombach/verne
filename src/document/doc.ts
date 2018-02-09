import Node from "./node";
import NodeMap from "./node_map";

export default class Doc {

  private nodeMap: NodeMap;

  constructor(nodeMap: NodeMap = new NodeMap()) {
    this.nodeMap = nodeMap;
  }

  replaceNodes(oldNodes: Node[], newNodes: Node[]): Doc {
    const nodeMap = this.nodeMap.clone();
    oldNodes.forEach((oldNode, index) => nodeMap.replace(oldNode, newNodes[index]));
    return new Doc(nodeMap);
  }

  deleteNodes(nodesToRemove: Node[]): Doc {
    const nodeMap = this.nodeMap.clone();
    nodesToRemove.forEach(node => nodeMap.remove(node));
    return new Doc(nodeMap);
  }

}
