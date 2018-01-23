import * as React from 'react';
import TextNode from '../../../document/text_node';
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

  // todo inline nodes still get re-rendered, this method is not even called when a block node updates
  shouldComponentUpdate(nextProps: InlineProps): boolean {
    return nextProps.node.text !== this.props.node.text ||
      JSON.stringify(nextProps.node.attrs) !== JSON.stringify(this.props.node.attrs);
  }

  render() {
    if (debug.logNodeRendering) console.info('Rendering Inline', this.props.node.id);
    return this.props.node.attrs
      .map(attr => Inline.attrElMap[attr] || 'span')
      .reduce((Prev, Cur) => <Cur>{Prev}</Cur>, <WriteJsText node={this.props.node} />);
  }

}
