import * as React from 'react';
import BlockNode from '../../../document/block_node';
import TextNode from '../../../document/text_node';
import WriteJsText from './inline';

interface WriteJsBlockProps {
  node: BlockNode
}

export default class WriteJsBlock extends React.Component<WriteJsBlockProps, undefined> {

  renderChild(node: BlockNode|TextNode): JSX.Element {
    if (node instanceof BlockNode) return <WriteJsBlock key={node.id} node={node} />;
    if (node instanceof TextNode) return <WriteJsText key={node.id} node={node} />;
    console.warn('Could not find React Component to render node', node);
    return null;
  }

  render() {
    const { node } = this.props;
    const BlockTag = node.tagName;
    return (
      <BlockTag>
        {node.children.map(node => this.renderChild(node))}
      </BlockTag>
    );
  }

}
