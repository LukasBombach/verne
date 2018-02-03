import DomParser from './parser/dom';
import { default as LibNode } from "./node";
import BlockNode from "./block";
import Selection from "../selection";
import insertTextTransformation from './transformations/insert_text';
import deleteSelectionTransformation from './transformations/delete_selection';
import {DELETE_SELECTION, TYPE_INSERT_TEXT} from "../actions/input";

export interface TransformationResult {
  doc: Doc;
  selection: Selection
}

export default class Doc extends LibNode {

  static fromElement(el: Node): Doc {
    const nodes = DomParser.getChildrenFor(el);
    const doc = new Doc(nodes);
    doc.children().forEach(child => child.__dangerouslyMutateParent(doc));
    return doc;
  }

  constructor(children: LibNode[] = []) {
    super(null, children)
  }

  async transform(action: any): Promise<TransformationResult> {
    if (action.type === TYPE_INSERT_TEXT) return await insertTextTransformation(this, action);
    if (action.type === DELETE_SELECTION) return await deleteSelectionTransformation(this, action);
    console.warn(`Could not find transformation for action "${action.type}"`, action);
    return { doc: this, selection: null };
  }

  replaceBlock(oldBlockNode: BlockNode, newBlockNode: BlockNode): Doc {
    const children = this.children().slice(0);
    const index = children.indexOf(oldBlockNode);
    children[index] = newBlockNode;
    return new Doc(children);
  }

  replaceBlocks(oldBlocks: BlockNode[], newBlocks: BlockNode[]): Doc {
    const children = this.children().slice(0);
    oldBlocks.forEach((oldBlock, index) => children[children.indexOf(oldBlock)] = newBlocks[index]);
    return new Doc(children);
  }

}
