import * as React from 'react';
import * as ReactDOM from 'react-dom';
import nodeMap from '../node_map';
import TextNode from '../../../document/text_node';

interface WriteJsTextProps {
  node: TextNode
}

export default class WriteJsText extends React.Component<WriteJsTextProps, undefined> {

  componentDidMount() {
      nodeMap.set(ReactDOM.findDOMNode(this), this.props.node);
  }

  componentWillUnmount() {
    nodeMap.delete(ReactDOM.findDOMNode(this));
  }

  render() {
    return this.props.node.text;
  }

}
