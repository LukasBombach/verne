import * as React from 'react';
import { Text as TextNode } from "@verne/verne";
import Text from './text';
import { debug } from '../config';

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
    if (debug.log.docRendering) { // todo put this in a logger class
      console.groupCollapsed('%cRendering %cInline %c%d %c%s', 'color: gray; font-weight: lighter;', 'color: black; font-weight: bold;', 'color: blue;', this.props.node.id, 'color: gray; font-weight: lighter;', this.props.node.attrs.join(', '));
      console.log(this.props.node);
      console.groupEnd();
    }
    return this.props.node.attrs
      .map(attr => Inline.attrElMap[attr] || 'span')
      .reduce((Prev, Cur) => <Cur>{Prev}</Cur>, <Text node={this.props.node} />);
  }

}
