import first from "rollup/dist/typings/utils/first";

export default class Node {

  private static nextNodeId = 0;

  private _id: number;
  private _parent: Node;
  private _children: Node[];

  constructor(parent: Node = null, children: Node[] = []) {
    this._id = ++Node.nextNodeId;
    this._parent = parent;
    this._children = children;
  }

  id(): number {
    return this._id;
  }

  index(): number {
    return this.parent() ? this.siblings().indexOf(this) : 0;
  }

  parent(condition = (node: Node) => true): Node {
    if (condition(this._parent)) return this._parent;
    return this._parent ? this._parent.parent(condition) : null;
  }

  prev(condition = (node: Node) => true): Node {
    const sibling = this.prevSiblings().reverse().find(condition);
    return sibling || null;
  }

  next(condition = (node: Node) => true): Node {
    const sibling = this.nextSiblings().find(condition);
    return sibling || null;
  }

  firstSibling(condition = (node: Node) => true): Node {
    const sibling = this.siblings().find(condition);
    return sibling || null;
  }

  lastSibling(condition = (node: Node) => true): Node {
    const sibling = this.siblings().reverse().find(condition);
    return sibling || null;
  }

  prevLeaf(condition = (node: Node) => true): Node {
    const lastLeafInPrev = this.prevSiblings().reduceRight((pre, cur) => pre || cur.lastLeaf(condition), null);
    if (lastLeafInPrev) return lastLeafInPrev;
    const parentWithPrev = this.parent(parent => !!parent && !!parent.prev());
    if (parentWithPrev) return parentWithPrev.prevLeaf(condition);
    return null;
  }

  nextLeaf(condition = (node: Node) => true): Node {
    const firstLeafInNext = this.nextSiblings().reduce((pre, cur) => pre || cur.firstLeaf(condition), null);
    if (firstLeafInNext) return firstLeafInNext;
    const parentWithNext = this.parent(parent => !!parent && !!parent.next());
    if (parentWithNext) return parentWithNext.nextLeaf(condition);
    return null;
  }

  firstLeaf(condition = (node: Node) => true): Node {
    const children = this.children();
    if (!children.length) return condition(this) ? this : null;
    const firstLeaf = children.reduce((pre, cur) => pre || cur.firstLeaf(condition), null);
    return firstLeaf || null;
  }

  lastLeaf(condition = (node: Node) => true): Node {
    const children = this.children();
    if (!children.length) return condition(this) ? this : null;
    const lastLeaf = children.reduceRight((pre, cur) => pre || cur.lastLeaf(condition), null);
    return lastLeaf || null;
  }

  siblings(condition = (node: Node) => true): Node[] {
    const parent = this.parent();
    return parent ? parent.children(condition) : condition(this) ? [this] : [];
  }

  prevSiblings(condition = (node: Node) => true): Node[] {
    return this.siblings(condition).slice(0, this.index());
  }

  nextSiblings(condition = (node: Node) => true): Node[] {
    return this.siblings(condition).slice(this.index() + 1);
  }

  nextSiblingsUntil(condition = (node: Node) => false): Node[] {
    const nextSiblings = this.nextSiblings();
    return nextSiblings.slice(0, nextSiblings.findIndex(condition));
  }

  children(condition = (node: Node) => true): Node[] {
    return this._children ? this._children.filter(condition) : [];
  }

  path(): Node[] {
    const parent = this.parent();
    return parent ? [this, ...parent.path()] : [this];
  }

  comparePositionWith(that: Node): number {
    const thisPath = this.path();
    const thatPath = that.path();
    const firstCommonParentIndex = thisPath.findIndex((node, index) => node === thatPath[index]);
    const comparableNodes = thisPath[firstCommonParentIndex].children();
    const thisComparableNode = thisPath[firstCommonParentIndex - 1];
    const thatComparableNode = thatPath[firstCommonParentIndex - 1];
    const thisIndex = comparableNodes.indexOf(thisComparableNode);
    const thatIndex = comparableNodes.indexOf(thatComparableNode);
    return thisIndex < thatIndex ? -1 : thisIndex === thatIndex ? 0 : 1;
  }

  __dangerouslyMutateParent(parent: Node): Node {
    this._parent = parent;
    return this;
  }

  __dangerouslyMutateChildren(children: Node[]): Node {
    this._children = children;
    return this;
  }

  static nodesBetween(firstNode: Node, lastNode: Node): Node[] {

    const firstParent = firstNode.parent();
    const lastParent = lastNode.parent();

    if (firstParent === lastParent) return firstNode.nextSiblingsUntil(node => node !== lastNode);

    const firstPath = firstNode.path();
    const lastPath = lastNode.path();

    const firstCommonParentIndex = firstPath.findIndex((node, index) => node === lastPath[index]);
    const firstComparableNode = firstPath[firstCommonParentIndex - 1];
    const lastComparableNode = lastPath[firstCommonParentIndex - 1];

    const firstParentSiblings = firstPath
      .slice(0, firstCommonParentIndex - 1)
      .map(parent => parent.nextSiblings())
      .reduce((acc, cur) => [...acc, ...cur], []);

    const lastParentSiblings = lastPath
      .slice(0, firstCommonParentIndex - 1)
      .map(parent => parent.prevSiblings())
      .reduce((acc, cur) => [...cur, ...acc], []);

    const nodesBetweenParents = firstComparableNode.nextSiblingsUntil(node => node === lastComparableNode);

    return [...firstParentSiblings, ...nodesBetweenParents, ...lastParentSiblings];

  }

}
