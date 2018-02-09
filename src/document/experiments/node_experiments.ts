interface CloneProperties {
  parent?: Node<any>;
  children?: Node<any>[];
  originId?: number;
}

export default class Node<C> {

  private static nextNodeId = 0;

  private _id: number;
  private _originId: number;
  private _parent: Node<any>;
  private _children: Node<any>[];
  private _content: C;

  constructor(parent: Node<any> = null, children: Node<any>[] = [], originId: number = null) {
    this._id = ++Node.nextNodeId;
    this._originId = originId || this._id;
    this._parent = parent;
    this._children = children.map(child => child.clone({ parent: this }));
  }

  get id(): number {
    return this._id;
  }

  get originId(): number {
    return this._originId;
  }

  get content(): C {
    return this._content;
  }

  get index(): number {
    return this.parent() ? this.siblings().indexOf(this) : 0;
  }

  get path(): Node<any>[] {
    const parent = this.parent();
    return parent ? [this, ...parent.path] : [this];
  }

  children(condition = (node: Node<any>) => true): Node<any>[] {
    return this._children ? this._children.filter(condition) : [];
  }

  parent(condition = (node: Node<any>) => true): Node<any> {
    if (condition(this._parent)) return this._parent;
    return this._parent ? this._parent.parent(condition) : null;
  }

  prev(condition = (node: Node<any>) => true): Node<any> {
    const sibling = this.prevSiblings().reverse().find(condition);
    return sibling || null;
  }

  next(condition = (node: Node<any>) => true): Node<any> {
    const sibling = this.nextSiblings().find(condition);
    return sibling || null;
  }

  firstSibling(condition = (node: Node<any>) => true): Node<any> {
    const sibling = this.siblings().find(condition);
    return sibling || null;
  }

  lastSibling(condition = (node: Node<any>) => true): Node<any> {
    const sibling = this.siblings().reverse().find(condition);
    return sibling || null;
  }

  prevLeaf(condition = (node: Node<any>) => true): Node<any> {
    const lastLeafInPrev = this.prevSiblings().reduceRight((pre, cur) => pre || cur.lastLeaf(condition), null);
    if (lastLeafInPrev) return lastLeafInPrev;
    const parentWithPrev = this.parent(parent => !!parent && !!parent.prev());
    if (parentWithPrev) return parentWithPrev.prevLeaf(condition);
    return null;
  }

  nextLeaf(condition = (node: Node<any>) => true): Node<any> {
    const firstLeafInNext = this.nextSiblings().reduce((pre, cur) => pre || cur.firstLeaf(condition), null);
    if (firstLeafInNext) return firstLeafInNext;
    const parentWithNext = this.parent(parent => !!parent && !!parent.next());
    if (parentWithNext) return parentWithNext.nextLeaf(condition);
    return null;
  }

  firstLeaf(condition = (node: Node<any>) => true): Node<any> {
    const children = this.children();
    if (!children.length) return condition(this) ? this : null;
    const firstLeaf = children.reduce((pre, cur) => pre || cur.firstLeaf(condition), null);
    return firstLeaf || null;
  }

  lastLeaf(condition = (node: Node<any>) => true): Node<any> {
    const children = this.children();
    if (!children.length) return condition(this) ? this : null;
    const lastLeaf = children.reduceRight((pre, cur) => pre || cur.lastLeaf(condition), null);
    return lastLeaf || null;
  }

  siblings(condition = (node: Node<any>) => true): Node<any>[] {
    const parent = this.parent();
    return parent ? parent.children(condition) : condition(this) ? [this] : [];
  }

  prevSiblings(condition = (node: Node<any>) => true): Node<any>[] {
    return this.siblings(condition).slice(0, this.index);
  }

  nextSiblings(condition = (node: Node<any>) => true): Node<any>[] {
    return this.siblings(condition).slice(this.index + 1);
  }

  nextSiblingsUntil(condition = (node: Node<any>) => false): Node<any>[] {
    const nextSiblings = this.nextSiblings();
    return nextSiblings.slice(0, nextSiblings.findIndex(condition));
  }

  pathUntil(condition = (node: Node<any>) => true): Node<any>[] {
    const parent = this.parent(condition);
    return parent ? [this, ...parent.path] : [this];
  }

  comparePositionWith(that: Node<any>): number {
    if (this === that) return 0;
    const [thisIndex, thatIndex] = Node.closestParents(this, that).map(node => node.index);
    return thisIndex < thatIndex ? -1 : thisIndex === thatIndex ? 0 : 1;
  }

  /*clone(properties: CloneProperties = {}): Node<C> {
    const parent = properties.parent || this.parent();
    const children = properties.children || this.children().slice(0);
    const originId = properties.originId || this.originId;
    return new Node<C>(parent, children, originId);
  }*/

  clone(): Node<C> {
    const parent = this.parent();
    const children = this.children().map(child => child.clone());
    const originId = this.originId;
    return new Node<C>(parent, children, originId);
  }

  static nodesBetween(firstNode: Node<any>, lastNode: Node<any>): Node<any>[] {
    if (firstNode.parent() === lastNode.parent()) return firstNode.nextSiblingsUntil(node => node === lastNode);
    const [firstParent, lastParent] = Node.closestParents(firstNode, lastNode);
    const firstParentSiblings = firstNode
      .pathUntil(node => node === lastParent)
      .map(parent => parent.nextSiblings())
      .reduce((acc, cur) => [...acc, ...cur], []);
    const lastParentSiblings = lastNode
      .pathUntil(node => node === firstParent)
      .map(parent => parent.prevSiblings())
      .reduce((acc, cur) => [...cur, ...acc], []);
    const nodesBetweenParents = firstParent.nextSiblingsUntil(node => node === lastParent);
    return [...firstParentSiblings, ...nodesBetweenParents, ...lastParentSiblings];
  }

  private static closestParents(a: Node<any>, b: Node<any>): [Node<any>, Node<any>] {
    const pathA = a.path;
    const pathB = b.path;
    const index = pathA.findIndex((node, index) => node === pathB[index]);
    return [pathA[index - 1], pathB[index - 1]];
  }

  private static groupNodesByParent(nodes: Node<any>[]): Map<Node<any>, Node<any>[]> {
    const map = new Map<Node<any>, Node<any>[]>();
    const tuples = nodes.map(node => [node.parent(), node]);
    tuples.forEach(([parent]) => map.set(parent, []));
    tuples.forEach(([parent, node]) => map.get(parent).push(node));
    return map;
  }

}
