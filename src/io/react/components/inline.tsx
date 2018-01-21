import * as React from 'react';
import TextNode from '../../../document/text_node';
import WriteJsText from './text';

interface WriteJsInlineProps {
  node: TextNode
}

interface attributeElementsMap {
  [key:string]: string;
  bold: string;
  italic: string;
  del: string;
}

export default class WriteJsInline extends React.Component<WriteJsInlineProps, undefined> {

  static attrElMap: attributeElementsMap = {
    bold: 'strong',
    italic: 'em',
    del: 'del',
  };

  render() {
    return this.props.node.attrs
      .map(attr => WriteJsInline.attrElMap[attr] || 'span')
      .reduce((Prev, Cur) => <Cur>{Prev}</Cur>, <WriteJsText node={this.props.node} />);
  }

}
