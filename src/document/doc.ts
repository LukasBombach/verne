import DomParser from './parser/dom';
import { default as LibNode } from "./node";
import BlockNode from "./block";
import Selection from "../selection";
import insertTextTransformation from './transformations/insert_text';
import deleteRangeTransformation from './transformations/delete_range';
import {DELETE_RANGE, TYPE_INSERT_TEXT} from "../actions/input";

export interface TransformationResult {
  doc: Doc;
  selection: Selection
}

export default class Doc extends LibNode {

  public static fromElement(el: Node): Doc {
    const nodes = DomParser.getChildrenFor(el);
    const doc = new Doc(nodes);
    doc.children().forEach(child => child.__dangerouslyMutateParent(doc)); // todo this sucks
    return doc;
  }

  constructor(children: LibNode[] = []) {
    super(null, children)
  }

  public async transform(action: any): Promise<TransformationResult> {
    if (action.type === TYPE_INSERT_TEXT) return await insertTextTransformation(this, action);
    if (action.type === DELETE_RANGE) return await deleteRangeTransformation(this, action);
    console.warn(`Could not find transformation for action "${action.type}"`, action);
    return { doc: this, selection: null };
  }

  public replaceBlock(oldBlockNode: BlockNode, newBlockNode: BlockNode) {
    const nodes = this.children().slice(0);
    const index = nodes.indexOf(oldBlockNode);
    nodes[index] = newBlockNode;
    return new Doc(nodes);
  }

}
