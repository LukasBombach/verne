import * as React from 'react';
import Doc from '../../../document/doc';
import BlockNode from '../../../document/block_node';
import TextNode from '../../../document/text_node';
import WriteJsBlock from './block';
import WriteJsInline from './inline';
import nodeMap from '../node_map';

interface WriteJsDocProps {
  doc: Doc;
}

class WriteJsDoc extends React.Component<WriteJsDocProps, undefined> {

  private el: Element;
  // private observer: MutationObserver;

  /*componentDidMount() {
    this.observer = new MutationObserver(mutations => {
      mutations.forEach(function(mutation) {
        console.log(mutation.type);
      });
    });
    const config = { attributes: true, childList: true, characterData: true, subtree: true };
    this.observer.observe(this.el, config);
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }*/


  constructor(props: WriteJsDocProps, context: any) {
    super(props, context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  getNodes(): Array<BlockNode|TextNode> {
    return this.props.doc ? this.props.doc.nodes : [];
  }

  handleKeyDown(e: any) {
    e.preventDefault();
    // console.log('activeElement', document.activeElement);
    const selection = window.getSelection();
    // console.log(selection);
    // console.log(nodeMap);
    // console.log(selection.focusNode);
    console.log(nodeMap.get(selection.focusNode));
    // console.log('component', this.findReactComponent(selection.focusNode));
  }

  findReactComponent(el: Node) {
    let operations: number = 0;
    while (el) {
      for (const key in el) {
        operations++;
        if (el.hasOwnProperty(key) && key.indexOf('_reactInternal') !== -1) {
          console.log('num operations', operations, 'key', key);
          return (el as any)[key];
        }
      }
      el = el.parentElement;
    }
    console.log('num operations', operations, 'returned null');
    return null;
  }

  renderNode(node: BlockNode|TextNode): JSX.Element {
    if (node instanceof BlockNode) return <WriteJsBlock key={node.id} node={node} />;
    if (node instanceof TextNode) return <WriteJsInline key={node.id} node={node} />;
    console.warn('Could not find React Component to render node', node);
    return null;
  }

  render() {
    return (
      <div
        contentEditable={true}
        suppressContentEditableWarning={true}
        onKeyDown={this.handleKeyDown}
        ref={el => this.el = el}
      >
        {this.getNodes().map(node => this.renderNode(node))}
      </div>
    );
  }

}

export default WriteJsDoc;
