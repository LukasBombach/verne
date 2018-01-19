import * as React from 'react';
import BlockNode from '../../document/block_node';
import WriteJsBlock from './block';
import TextNode from '../../document/text_node';
import WriteJsText from './text';
import Doc from '../../document/doc';

interface WriteJsDocProps {
  doc: Doc;
}

class WriteJsDoc extends React.Component<WriteJsDocProps, undefined> {

  static renderNode(node: BlockNode|TextNode): JSX.Element {
    if (node instanceof BlockNode) return <WriteJsBlock key={node.id} node={node} />;
    if (node instanceof TextNode) return <WriteJsText key={node.id} node={node} />;
    console.warn('Could not find React Component to render node', node);
    return null;
  }

  getNodes(): Array<BlockNode|TextNode> {
    return this.props.doc ? this.props.doc.nodes : [];
  }

  render() {
    return (
      <React.Fragment>
        {this.getNodes().map(node => WriteJsDoc.renderNode(node))}
      </React.Fragment>
    );
  }

}

export default WriteJsDoc;
