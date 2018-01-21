import * as React from 'react';
import nodeMap from '../node_map';
import Doc from '../../../document/doc';
import BlockNode from '../../../document/block_node';
import TextNode from '../../../document/text_node';
import WriteJsBlock from './block';
import WriteJsInline from './inline';

interface WriteJsDocProps {
  doc: Doc;
}

class WriteJsDoc extends React.Component<WriteJsDocProps, undefined> {

  constructor(props: WriteJsDocProps, context: any) {
    super(props, context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  getNodes(): Array<BlockNode|TextNode> {
    return this.props.doc ? this.props.doc.nodes : [];
  }

  handleKeyDown() {
    const selection = window.getSelection();
    console.log(nodeMap.get(selection.focusNode));
  }

  renderNode(node: BlockNode|TextNode): JSX.Element {
    if (node instanceof BlockNode) return <WriteJsBlock key={node.id} node={node} />;
    if (node instanceof TextNode) return <WriteJsInline key={node.id} node={node} />;
    console.warn('Could not find React Component to render node', node);
    return null;
  }

  render() {
    return (
      <div contentEditable={true} suppressContentEditableWarning={true} onKeyDown={this.handleKeyDown}>
        {this.getNodes().map(node => this.renderNode(node))}
      </div>
    );
  }

}

export default WriteJsDoc;
