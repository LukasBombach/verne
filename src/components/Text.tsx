import React from "react";
import ReactDOM from "react-dom";

interface TextProps {
  text: string;
  id: number;
}

interface VerneInternal {
  id: number;
}

type VerneNode = (Element & { __verneInternal: VerneInternal }) | null;

class Text extends React.Component<TextProps> {
  componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this) as VerneNode;
    if (!domNode) throw new Error("Did not get a DOM node");
    domNode.__verneInternal = domNode.__verneInternal || {};
    domNode.__verneInternal.id = this.props.id;
  }

  render() {
    return this.props.text;
  }
}

export default Text;
