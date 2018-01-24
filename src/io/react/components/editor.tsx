import * as React from 'react';
import WriteEditor from "../../../write_editor";
import BlockNode from '../../../document/block_node';
import TextNode from '../../../document/text_node';
import Block from './block';
import Inline from './inline';
import eventHandlers from '../eventHandlers';

interface EditorProps {
  html?: string;
}

interface EditorState {
  nodes: Array<BlockNode|TextNode>;
}

export interface EventHandlerInterface {
  setState: Function;
  core: WriteEditor;
}

export default class Editor extends React.Component<EditorProps, EditorState> {

  private core: WriteEditor;
  private eventHandlers: any; // todo temp

  constructor(props: EditorProps, context: any) {
    super(props, context);
    this.core = WriteEditor.fromHtml(props.html);
    this.state = { nodes: this.core.doc.nodes };
    const eventHandlerInterface: EventHandlerInterface = {
      setState: (newState: any, callback: Function) => this.setState(newState, callback),
      core: this.core,
    };
    this.eventHandlers = eventHandlers
      .map(([eventName, handler]) => [eventName, (e: any) => handler(eventHandlerInterface, e)])
      .reduce((acc, [eventName, handler]) => ({ [eventName]: handler, ...acc }), {})
  }

  //getEventHandlers() {
  //  const eventHandlerInterface: EventHandlerInterface = {
  //    setState: (...args: any[]) => this.setState(...args),
  //    core: this.core,
  //  };
  //  return Object.keys(eventHandlers)
  //    .map((key: string) => [key, (...args: any[]) => {
  //        return (...args: any[]) => eventHandlers[key](eventHandlerInterface, ...args)
  //      }]
  //    )
  //    .reduce((eventHandlers, handler) => eventHandlers[key] = handler, {})
  //}

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
