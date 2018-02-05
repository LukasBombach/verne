import DomParser from './dom';
import Block from "../block";
import Text from "../text";

export default class HtmlParser {

  static getChildrenFor(html: string): (Block|Text)[] {
    const div = document.createElement('div');
    div.innerHTML = html;
    return DomParser.getChildrenFor(div);
  }

}
