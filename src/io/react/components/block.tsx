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

  shouldComponentUpdate(nextProps: BlockProps): boolean {
    return nextProps.node.id !== this.props.node.id;
  }

  static renderChild(node: Node): JSX.Element {
    if (node instanceof BlockNode) return <Block key={node.originId} node={node} />;
    if (node instanceof TextNode) return <Inline key={node.originId} node={node} />;
  }

  render() {
    const { node, node: { tagName: BlockTag } } = this.props;
    if (debug.log.nodeRendering) console.info('Rendering Block ', node.originId, node.id);
    return (
      <BlockTag>
        {node.children().map(child => Block.renderChild(child))}
      </BlockTag>
    );
  }

}
