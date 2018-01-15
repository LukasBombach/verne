import * as React from 'react';
import BlockNode from '../../document/block_node';
import WriteJsText from './text';
import TextNode from '../../document/text_node';

interface WriteJsBlockProps {
  node: BlockNode
}

export default class WriteJsBlock extends React.Component<WriteJsBlockProps, undefined> {

  static propTypes = {
    node: BlockNode,
  };

  static defaultProps = {
    node: new BlockNode(null),
  };

  renderChild(node: BlockNode|TextNode): JSX.Element {
    if (node instanceof BlockNode) return <WriteJsBlock key={node.id} node={(node as BlockNode)} />;
    if (node instanceof TextNode) return <WriteJsText key={node.id} node={(node as TextNode)} />;
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
