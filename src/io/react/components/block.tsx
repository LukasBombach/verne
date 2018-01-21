import * as React from 'react';
import BlockNode from '../../../document/block_node';
import TextNode from '../../../document/text_node';
import Inline from './inline';

interface BlockProps {
  node: BlockNode
}

export default class Block extends React.Component<BlockProps, undefined> {

  renderChild(node: BlockNode|TextNode): JSX.Element {
    if (node instanceof BlockNode) return <Block key={node.id} node={node} />;
    if (node instanceof TextNode) return <Inline key={node.id} node={node} />;
    console.warn('Could not find React Component to render node', node);
    return null;
  }

  render() {
    const { children, tagName: BlockTag } = this.props.node;
    return (
      <BlockTag>
        {children.map(child => this.renderChild(child))}
      </BlockTag>
    );
  }

}
