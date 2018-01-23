import * as React from 'react';
import {KeyboardEvent} from "react";
import WriteEditor from "../../../write_editor";
import Doc from "../../../document/doc";
import Selection from '../selection';
import BlockNode from '../../../document/block_node';
import TextNode from '../../../document/text_node';
import Block from './block';
import Inline from './inline';

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
    // this.core.onUpdate((doc: Doc) => this.setState({ nodes: doc.nodes }));
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  async handleKeyDown(e: KeyboardEvent<Node>) {
    e.preventDefault();
    const selection = Selection.getUserSelection();
    const node = selection.focusNode;
    const offset = selection.focusOffset;
    const key = e.key;
    const action = { type: 'input', node, offset, key };
    const callback = (finalAction: any, doc: Doc) => {
      console.log(finalAction, doc);
      this.setState({ nodes: doc.nodes })
    };
    await this.core.actions.dispatch(action, callback);
  }

  getEventHandlers() {
    return {
      onKeyDown: this.handleKeyDown,
    }
  }

  renderNode(node: BlockNode|TextNode): JSX.Element {
    if (node instanceof BlockNode) return <Block key={node.id} node={node} />;
    if (node instanceof TextNode) return <Inline key={node.id} node={node} />;
    console.warn('Could not find React Component to render node', node);
    return null;
  }

  render() {
    return (
      <div contentEditable={true} suppressContentEditableWarning={true} {...this.getEventHandlers()}>
        {this.state.nodes.map(node => this.renderNode(node))}
      </div>
    );
  }

}
