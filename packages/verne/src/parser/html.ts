import DomParser from './dom';
import NodeMap from "../document/node_map";

export default class HtmlParser {

  static getNodeMapFor(html: string): NodeMap {
    const div = document.createElement('div');
    div.innerHTML = html;
    return DomParser.getNodeMapFor(div);
  }

}
