import * as React from 'react';
import WriteEditor from "../../../write_editor";
import BlockNode from '../../../document/block_node';
import TextNode from '../../../document/text_node';
import Block from './block';
import Inline from './inline';
import getEventHandlers from '../eventHandlers';

interface EditorProps {
  html?: string;
}

interface EditorState {
  nodes: Array<BlockNode|TextNode>;
}

interface EventHandlers {
  [key: string]: Function
}

export default class Editor extends React.Component<EditorProps, EditorState> {

  public core: Readonly<WriteEditor> = WriteEditor.fromHtml(this.props.html);
  public state: Readonly<EditorState> = { nodes: this.core.doc.children };
  private eventHandlers: EventHandlers = getEventHandlers(this);

  renderNode(node: BlockNode|TextNode): JSX.Element {
    if (node instanceof BlockNode) return <Block key={node.id} node={node} />;
    if (node instanceof TextNode) return <Inline key={node.id} node={node} />;
    console.warn('Could not find React Component to render node', node);
    return null;
  }

  render() {
    return (
      <div contentEditable={true} suppressContentEditableWarning={true} spellCheck={false} {...this.eventHandlers}>
        {this.state.nodes.map(node => this.renderNode(node))}
      </div>
    );
  }

}
