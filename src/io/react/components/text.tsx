import * as React from 'react';
import * as ReactDOM from 'react-dom';
import nodeMap from '../node_map';
import TextNode from '../../../document/text_node';

interface TextProps {
  node: TextNode
}

export default class Text extends React.Component<TextProps, undefined> {

  componentDidMount() {
      nodeMap.set(ReactDOM.findDOMNode(this), this.props.node);
  }

  shouldComponentUpdate(nextProps: TextProps): boolean {
    return nextProps.node.id !== this.props.node.id;
  }

  componentWillUnmount() {
    nodeMap.delete(ReactDOM.findDOMNode(this));
  }

  render() {
    // console.info('Rendering Text  ', this.props.node.id);
    return this.props.node.text;
  }

}
