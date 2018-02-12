import * as React from 'react';
import BlockNode from '../../../document/block';
import TextNode from '../../../document/text';
import Node from '../../../document/node';
import Inline from './inline';
import { debug } from '../../../config';

interface BlockProps {
  node: BlockNode;
}

export default class Block extends React.Component<BlockProps, undefined> {

  static renderChild(node: Node): JSX.Element {
    if (node instanceof BlockNode) return <Block key={node.id} node={node} />;
    if (node instanceof TextNode) return <Inline key={node.id} node={node} />;
  }

  render() {
    const { node, node: { tagName: BlockTag } } = this.props;
    if (debug.log.docRendering) console.info('%cRendering %cBlock  %c%d %d', 'color: gray; font-weight: lighter;', 'color: black; font-weight: bold;', 'color: blue;', node.originId, node.id);
    return (
      <BlockTag>
        {node.children().map(child => Block.renderChild(child))}
      </BlockTag>
    );
  }

}
