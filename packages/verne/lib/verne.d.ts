import Doc from './document/doc';
import Actions from './actions';
export default class Verne {
    doc: Doc;
    actions: Readonly<Actions>;
    static fromHtml(html: string): Verne;
    static fromElement(el: Element): Verne;
    constructor(doc?: Doc);
}
