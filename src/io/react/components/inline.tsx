import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TextNode from '../../../document/text_node';
import nodeMap from '../node_map';

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

  private el: Element;
  // private observer: MutationObserver;

  constructor(props: WriteJsTextProps, context: any) {
    super(props, context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.mergeIntoJsxElement = this.mergeIntoJsxElement.bind(this);
  }

  componentDidMount() {
    if (this.el) {
      nodeMap.set(this.el.firstChild, this.props.node);
    } else {
      nodeMap.set(ReactDOM.findDOMNode(this), this.props.node);
    }
  }

  /*componentDidMount() {
    this.observer = new MutationObserver(mutations => {
      mutations.forEach(function(mutation) {
        console.log(mutation.type);
      });
    });
    const config = { attributes: true, childList: true, characterData: true }
    this.observer.observe(this.el, config);
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }*/

  handleKeyDown(e: any) {
    e.preventDefault();
    console.log(e);
  }

  mergeIntoJsxElement(Prev: JSX.Element|string, Cur: string, currentIndex: number) {
    // return currentIndex === 0 ? <Cur onKeyDown={this.handleKeyDown}>{Prev}</Cur> : <Cur>{Prev}</Cur>;
    return currentIndex === 0 ? <Cur ref={(el: Element) => this.el = el}>{Prev}</Cur> : <Cur>{Prev}</Cur>;
  }

  render() {
    return this.props.node.attrs
      .map(attr => WriteJsText.attrElMap[attr] || 'span')
      .reduce(this.mergeIntoJsxElement, this.props.node.text);
  }

}
