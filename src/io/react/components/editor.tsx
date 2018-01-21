import * as React from 'react';
import nodeMap from '../node_map';
import BlockNode from '../../../document/block_node';
import TextNode from '../../../document/text_node';
import Block from './block';
import Inline from './inline';
import WriteEditor from "../../../write_editor";

interface EditorProps {
  html?: string;
}

interface EditorState {
  nodes: Array<BlockNode|TextNode>;
}

export default class Editor extends React.Component<EditorProps, EditorState> {

  private core: WriteEditor;

  constructor(props: EditorProps, context: any) {
    super(props, context);
    this.core = WriteEditor.fromHtml(props.html);
    this.state = { nodes: this.core.doc.nodes };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown() {
    const selection = window.getSelection();
    console.log(nodeMap.get(selection.focusNode));
  }

  renderNode(node: BlockNode|TextNode): JSX.Element {
    if (node instanceof BlockNode) return <Block key={node.id} node={node} />;
    if (node instanceof TextNode) return <Inline key={node.id} node={node} />;
    console.warn('Could not find React Component to render node', node);
    return null;
  }

  render() {
    return (
      <div contentEditable={true} suppressContentEditableWarning={true} onKeyDown={this.handleKeyDown}>
        {this.state.nodes.map(node => this.renderNode(node))}
      </div>
    );
  }

}
