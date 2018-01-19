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

  static attrElMap: attributeElementsMap = {
    bold: 'strong',
    italic: 'em',
    del: 'del',
  };

  render() {
    return this.props.node.attrs
      .map(attr => WriteJsText.attrElMap[attr] || 'span')
      .reduce((Prev: JSX.Element|string, Cur) => <Cur>{Prev}</Cur>, this.props.node.text);
  }

}
