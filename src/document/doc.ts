import DomParser from './dom_parser';
import TextNode from "./text_node";
import BlockNode from "./block_node";
import Selection from "../selection";
import insertTextTransformation from './transformations/insert_text';
import {TYPE_INSERT_TEXT} from "../actions/input";

export interface TransformationResult {
  doc: Doc;
  selection: Selection
}

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

  public async transform(action: any): Promise<TransformationResult> {
    if (action.type === TYPE_INSERT_TEXT) return await insertTextTransformation(this, action);
    console.warn(`Could not find transformation for action "${action.type}"`, action);
    return { doc: this, selection: null };
  }

  public replaceBlockNode(oldBlockNode: BlockNode, newBlockNode: BlockNode) {
    const nodes = this.nodes.slice(0);
    const index = nodes.indexOf(oldBlockNode);
    nodes[index] = newBlockNode;
    return new Doc(nodes);
  }

}
