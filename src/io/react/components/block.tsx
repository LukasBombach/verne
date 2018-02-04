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

  renderChild(node: Node): JSX.Element {
    if (node instanceof BlockNode) return <Block key={node.originId} node={node} />;
    if (node instanceof TextNode) return <Inline key={node.originId} node={node} />;
    console.warn('Could not find React Component to render node', node);
    return null;
  }

  render() {
    const { node } = this.props;
    const BlockTag = node.tagName;
    if (debug.log.nodeRendering) console.info('Rendering Block ', node.originId, node.id);
    return (
      <BlockTag>
        {node.children().map(child => this.renderChild(child))}
      </BlockTag>
    );
  }

}
