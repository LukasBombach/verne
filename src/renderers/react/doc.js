import React, { Component, Fragment } from 'react';
import BlockNode from '../../document/block_node';
import WriteJsBlock from './block';
import TextNode from '../../document/text_node';
import WriteJsText from './text';
import Doc from '../../document/doc';

class WriteJsDoc extends Component {

  static renderNode(node) {
    if (node instanceof BlockNode) return <WriteJsBlock key={node.id} node={node} />;
    if (node instanceof TextNode) return <WriteJsText key={node.id} node={node} />;
    console.warn('Could not find React Component to render node', node);
    return null;
  }

  render() {
    return (
      <Fragment>
        {this.props.doc.nodes.map(node => WriteJsDoc.renderNode(node))}
      </Fragment>
    );
  }

}

/*WriteJsDoc.propTypes = {
  doc: Doc,
};

WriteJsDoc.defaultProps = {
  doc: new Doc(),
};*/

export default WriteJsDoc;
