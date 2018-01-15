import DomParser from './dom_parser';
import WriteEditor from "../write_editor";
import TextNode from "./text_node";
import BlockNode from "./block_node";

export default class Doc {

  private editor: WriteEditor;

  public nodes: Array<BlockNode|TextNode>;

  constructor(editor: WriteEditor) {
    this.editor = editor;
    this.nodes = DomParser.getChildrenFor(this.editor.getEl());
  }

}
