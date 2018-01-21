import DomParser from './dom_parser';
import WriteEditor from "../write_editor";
import TextNode from "./text_node";
import BlockNode from "./block_node";

export default class Doc {

  public nodes: Array<BlockNode|TextNode>;

  constructor(el: Node) {
    this.nodes = DomParser.getChildrenFor(el);
  }

}
