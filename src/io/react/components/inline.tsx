import * as React from 'react';
import TextNode from '../../../document/text_node';
import WriteJsText from './text';

interface InlineProps {
  node: TextNode
}

interface attributeElementsMap {
  [key:string]: string;
  bold: string;
  italic: string;
  del: string;
}

export default class Inline extends React.Component<InlineProps, undefined> {

  static attrElMap: attributeElementsMap = {
    bold: 'strong',
    italic: 'em',
    del: 'del',
  };

  shouldComponentUpdate(nextProps: InlineProps): boolean {
    return nextProps.node.id !== this.props.node.id;
  }

  render() {
    // console.info('Rendering Inline', this.props.node.id);
    return this.props.node.attrs
      .map(attr => Inline.attrElMap[attr] || 'span')
      .reduce((Prev, Cur) => <Cur>{Prev}</Cur>, <WriteJsText node={this.props.node} />);
  }

}
