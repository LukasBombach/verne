import * as React from 'react';
import * as ReactDOM from 'react-dom';
import NodeMap from '../node_map';
import TextNode from '../../../document/text';
import { debug } from '../../../config';

interface TextProps {
  node: TextNode
}

export default class Text extends React.Component<TextProps, undefined> {

  componentDidMount() {
      NodeMap.set(ReactDOM.findDOMNode(this), this.props.node);
  }

  shouldComponentUpdate(nextProps: TextProps): boolean {
    return nextProps.node.id() !== this.props.node.id();
  }

  componentWillUnmount() {
    NodeMap.delete(ReactDOM.findDOMNode(this));
  }

  render() {
    if (debug.log.nodeRendering) console.info('Rendering Text  ', this.props.node.id());
    return this.props.node.text();
  }

}
