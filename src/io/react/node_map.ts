import BlockNode from "../../document/block_node";
import TextNode from "../../document/text_node";

const nodeMap: Map<Node, BlockNode|TextNode> = new Map();

export default nodeMap;