import React, { Component } from 'react';
import BlockNode from '../../document/block_node';
import WriteJsText from './text';
import TextNode from '../../document/text_node';

class WriteJsBlock extends Component {

  renderChild(node) {
    if (node instanceof BlockNode) return <WriteJsBlock node={node} />;
    if (node instanceof TextNode) return <WriteJsText node={node} />;
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

/*WriteJsBlock.propTypes = {
  node: BlockNode,
};

WriteJsBlock.defaultProps = {
  node: new BlockNode(),
};*/

export default WriteJsBlock;
