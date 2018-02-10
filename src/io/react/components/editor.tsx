import * as React from 'react';
import WriteEditor from "../../../write_editor";
import BlockNode from '../../../document/block';
import TextNode from '../../../document/text';
import Block from './block';
import Inline from './inline';
import getEventHandlers from '../eventHandlers';
import Node from "../../../document/node";
import Doc from "../../../document/doc";
import { debug } from "../../../config";

interface EditorProps {
  html?: string;
}

interface EditorState {
  doc: Doc;
}

interface EventHandlers {
  [key: string]: Function
}

export default class Editor extends React.Component<EditorProps, EditorState> {

  public editor: Readonly<WriteEditor> = WriteEditor.fromHtml(this.props.html);
  public state: Readonly<EditorState> = { doc: this.editor.doc };
  private eventHandlers: EventHandlers = getEventHandlers(this);
  private contentEditableProps = { contentEditable: true, suppressContentEditableWarning: true, spellCheck: false };

  static renderNode(node: Node): JSX.Element {
    if (node instanceof BlockNode) return <Block key={node.originId} node={node} />;
    if (node instanceof TextNode) return <Inline key={node.originId} node={node} />;
  }

  render() {
    if (debug.log.docRendering) console.info('Rendering Doc ', this.state.doc.id, ' ', this.state.doc);
    return (
      <div {...this.contentEditableProps} {...this.eventHandlers}>
        {this.state.doc.nodes().map(node => Editor.renderNode(node))}
      </div>
    );
  }

}
