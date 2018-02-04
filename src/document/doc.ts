import DomParser from './parser/dom';
import { default as LibNode } from "./node";
import Selection from "../selection";
import insertTextTransformation from './transformations/insert_text';
import deleteSelectionTransformation from './transformations/delete_selection';
import {DELETE_SELECTION, TYPE_INSERT_TEXT} from "../actions/input";

interface CloneProperties {
  children?: LibNode[];
  originId?: number;
}

export interface TransformationResult {
  doc: Doc;
  selection: Selection
}

export default class Doc extends LibNode {

  static fromElement(el: Node): Doc {
    const nodes = DomParser.getChildrenFor(el);
    return new Doc(nodes);
  }

  constructor(children: LibNode[] = [], originId?: number) {
    super(null, children, originId);
  }

  async transform(action: any): Promise<TransformationResult> {
    if (action.type === TYPE_INSERT_TEXT) return await insertTextTransformation(this, action);
    if (action.type === DELETE_SELECTION) return await deleteSelectionTransformation(this, action);
    console.warn(`Could not find transformation for action "${action.type}"`, action);
    return { doc: this, selection: null };
  }

  clone(properties: CloneProperties = {}): this {
    const children = properties.children || this.children().slice(0);
    const originId = properties.originId || this.originId;
    return new (Doc as any)(children, originId);
  }

}
