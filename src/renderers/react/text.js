import React, { Component } from 'react';
import TextNode from '../../document/text_node';

class WriteJsText extends Component {

  static attrElMap = {
    bold: 'strong',
    italic: 'em',
    del: 'del',
  };

  getReactElement(children) {
    if (!children.length) return this.props.node.text;
    const tagName = children.pop();
    return React.createElement(tagName, null, this.getReactElement(children));
  }

  render() {
    const elements = this.props.node.attrs
      .map(attr => WriteJsText.attrElMap[attr] || 'span');
    return this.getReactElement(elements);
  }

}

/*WriteJsText.propTypes = {
  node: TextNode,
};

WriteJsText.defaultProps = {
  node: new TextNode(),
};*/

export default WriteJsText;
