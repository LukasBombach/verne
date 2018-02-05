import * as React from 'react';
import TextNode from '../../../document/text';
import WriteJsText from './text';
import { debug } from '../../../config';

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
    return nextProps.node.text !== this.props.node.text ||
      JSON.stringify(nextProps.node.attrs) !== JSON.stringify(this.props.node.attrs);
  }

  render() {
    if (debug.log.nodeRendering) console.info('Rendering Inline', this.props.node.originId, this.props.node.id);
    return this.props.node.attrs
      .map(attr => Inline.attrElMap[attr] || 'span')
      .reduce((Prev, Cur) => <Cur>{Prev}</Cur>, <WriteJsText node={this.props.node} />);
  }

}
