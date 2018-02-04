import DomParser from './dom';
import Block from "../block";
import Text from "../text";

export default class HtmlParser {

  static getChildrenFor(html: string): (Block|Text)[] {
    const template = document.createElement('template');
    template.innerHTML = html;
    return DomParser.getChildrenFor(template.content);
  }

}
