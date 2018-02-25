import Node from "./node";
export interface CloneProperties {
    text?: string;
    attrs?: string[];
    parent?: Node;
    originId?: number;
}
export default class Text extends Node {
    private _text;
    private _attrs;
    constructor(text?: string, attrs?: string[], originId?: number);
    readonly text: string;
    readonly attrs: string[];
    readonly length: number;
    insertString(offset: number, str: string): Text;
    appendString(str: string): Text;
    removeString(startOffset: number, endOffset?: number): Text;
    attrsEqual(that: Text): boolean;
    prevTextLeaf(): Text;
    nextTextLeaf(): Text;
    clone(properties?: CloneProperties): Text;
}
