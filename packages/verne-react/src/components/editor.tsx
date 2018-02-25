import * as React from 'react';
import Verne from "@verne/verne";
import { Doc } from "@verne/verne";
import { Node } from "@verne/verne";
import { Block as BlockNode } from "@verne/verne";
import { Text as TextNode } from "@verne/verne";
import Block from './block';
import Inline from './inline';
import getEventHandlers from '../eventHandlers';
import { debug } from "../config";

export interface EditorProps {
  html?: string;
}

export interface EditorState {
  doc: Doc;
}

export interface EventHandlers {
  [key: string]: Function
}

export default class Editor extends React.Component<EditorProps, EditorState> {

  public editor: Readonly<Verne> = Verne.fromHtml(this.props.html);
  public state: Readonly<EditorState> = { doc: this.editor.doc };
  private eventHandlers: EventHandlers = getEventHandlers(this);
  private contentEditableProps = { contentEditable: true, suppressContentEditableWarning: true, spellCheck: false };

  static renderNode(node: Node): JSX.Element {
    if (node instanceof BlockNode) return <Block key={node.id} node={node} />;
    if (node instanceof TextNode) return <Inline key={node.id} node={node} />;
  }

  render() {
    if (debug.log.docRendering) { // todo put this in a logger class
      console.groupCollapsed('%cRendering %cDoc    %c%d', 'color: gray; font-weight: lighter;', 'color: black; font-weight: bold;', 'color: blue;', this.state.doc.id);
      console.log(this.state.doc);
      console.groupEnd();
    }
    return (
      <div {...this.contentEditableProps} {...this.eventHandlers}>
        {this.state.doc.children().map(node => Editor.renderNode(node))}
      </div>
    );
  }

}
