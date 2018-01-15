import * as React from 'react';
import TextNode from '../../document/text_node';

interface WriteJsTextProps {
  node: TextNode
}

interface attributeElementsMap {
  [key:string]: string;
  bold: string;
  italic: string;
  del: string;
}

export default class WriteJsText extends React.Component<WriteJsTextProps, undefined> {

  static propTypes = {
    node: TextNode,
  };

  static defaultProps = {
    node: new TextNode(),
  };

  static attrElMap: attributeElementsMap = {
    bold: 'strong',
    italic: 'em',
    del: 'del',
  };

  getReactElement(children: string[]): React.DOMElement<any, any>|string { // todo remove any
    if (!children.length) return this.props.node.text;
    const tagName = children.pop();
    return React.createElement(tagName, null, this.getReactElement(children));
  }

  render() {
    const elements:string[] = this.props.node.attrs
      .map(attr => WriteJsText.attrElMap[attr] || 'span');
    return this.getReactElement(elements);
  }

}
