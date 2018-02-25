import Node from "./node";
export interface CloneProperties {
    tagName?: string;
    parent?: Node;
    children?: Node[];
    originId?: number;
}
export default class Block extends Node {
    tagName: Readonly<string>;
    constructor(tagName: string, originId?: number);
    clone(properties?: CloneProperties): Block;
}
