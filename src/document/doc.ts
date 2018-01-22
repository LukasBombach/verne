import DomParser from './dom_parser';
import TextNode from "./text_node";
import BlockNode from "./block_node";

import insertTextTransformation from './transformations/insert_text';

export default class Doc {
  private static nextNodeId = 0;

  public id: number;
  public nodes: Array<BlockNode|TextNode>;

  public static fromElement(el: Node): Doc {
    const nodes = DomParser.getChildrenFor(el);
    return new Doc(nodes);
  }

  constructor(nodes: Array<BlockNode|TextNode> = []) {
    this.nodes = nodes;
    this.id = ++Doc.nextNodeId;
    Object.freeze(this);
  }

  public async transform(transformationName: string, params: any): Promise<Doc> {
    if (transformationName === 'insertText') return await insertTextTransformation(this, params);
    else console.warn(`Could not find handler for transformationName "${transformationName}"`);
  }

  public replaceBlockNode(oldBlockNode: BlockNode, newBlockNode: BlockNode) {
    const nodes = this.nodes.slice(0);
    const index = nodes.indexOf(oldBlockNode);
    nodes[index] = newBlockNode;
    return new Doc(nodes);
  }

}
