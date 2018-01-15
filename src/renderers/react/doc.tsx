import * as React from 'react';
import BlockNode from '../../document/block_node';
import WriteJsBlock from './block';
import TextNode from '../../document/text_node';
import WriteJsText from './text';
import Doc from '../../document/doc';

interface WriteJsDocProps {
  doc: Doc
}

class WriteJsDoc extends React.Component<WriteJsDocProps, undefined> {

  static propTypes = {
    doc: Doc,
  };

  static defaultProps = {
    doc: new Doc(null),
  };

  static renderNode(node: BlockNode|TextNode): JSX.Element {
    if (node instanceof BlockNode) return <WriteJsBlock key={node.id} node={(node as BlockNode)} />;
    if (node instanceof TextNode) return <WriteJsText key={node.id} node={(node as TextNode)} />;
    console.warn('Could not find React Component to render node', node);
    return null;
  }

  render() {
    return (
      <React.Fragment>
        {this.props.doc.nodes.map(node => WriteJsDoc.renderNode(node))}
      </React.Fragment>
    );
  }

}

export default WriteJsDoc;
