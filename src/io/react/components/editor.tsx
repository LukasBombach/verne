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

export interface EventHandlerInterface {
  setState: Function;
  core: WriteEditor;
}

export default class Editor extends React.Component<EditorProps, EditorState> {

  private core: WriteEditor;
  private eventHandlers: EventHandlers;

  constructor(props: EditorProps, context: any) {
    super(props, context);
    this.core = WriteEditor.fromHtml(props.html);
    this.state = { nodes: this.core.doc.nodes };
    this.eventHandlers = getEventHandlers(this.getEventHandlerInterface());
  }

  getEventHandlerInterface(): EventHandlerInterface {
    return  {
      setState: (newState: any, callback?: () => void): void => this.setState(newState, callback),
      core: this.core,
    };
  }

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
