import Node from "./node";
import NodeMap from "./node_map";
import WriteEditor from "../write_editor";
import Selection from "../selection";
import insertTextTransformation from './transformations/insert_text';
import deleteSelectionTransformation from './transformations/delete_selection';
import {DELETE_SELECTION, TYPE_INSERT_TEXT} from "../actions/input";

export interface TransformationResult {
  doc: Doc;
  selection: Selection
}

export default class Doc {

  private static nextDocId = 0;

  public id: Readonly<number>;
  public nodeMap: Readonly<NodeMap>;
  private editor: Readonly<WriteEditor>;

  constructor(editor: WriteEditor, nodeMap: NodeMap = new NodeMap()) {
    this.id = ++Doc.nextDocId;
    this.nodeMap = nodeMap;
    this.editor = editor;
  }

  nodes(): Node[] {
    return [new Node(this.editor)];
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
    return new Doc(this.editor, nodeMap);
  }

  deleteNodes(nodes: Node[]): Doc {
    const nodeMap = this.nodeMap.clone();
    nodes.forEach(node => nodeMap.remove(node));
    return new Doc(this.editor, nodeMap);
  }

  async transform(action: any): Promise<TransformationResult> {
    if (action.type === TYPE_INSERT_TEXT) return await insertTextTransformation(this, action);
    if (action.type === DELETE_SELECTION) return await deleteSelectionTransformation(this, action);
    console.warn(`Could not find transformation for action "${action.type}"`, action);
    return { doc: this, selection: null };
  }

}
