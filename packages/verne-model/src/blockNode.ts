import InlineNode from "./inlineNode";

export default class BlockNode {
  public children: Array<BlockNode | InlineNode>;
}
