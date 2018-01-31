export default class Node {

  private static nextNodeId = 0;

  private _id: number;
  private _parent: Node;
  private _children: Array<Node>;

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

  children(condition = (node: Node) => true): Node[] {
    return this._children ? this._children.filter(condition) : [];
  }

  // contains(that: Node): boolean {
  //   if (this === that) return true;
  //   if (this.children().indexOf(that) !== -1) return true;
  //   this.children().reduce((pre, cur) => pre || cur.contains(that), false);
  // }

  // precedes(that: Node): boolean {
  //   if (this.parent() === that.parent()) return this.index() <= that.index();
  //   if (this.prevSiblings().reduceRight((pre, cur) => pre || cur === that, false)) return true;
  //   // parent prev?
  // }

  // precedes(that: Node): boolean {
  //   if (this.parent() === that.parent()) return this.index() <= that.index();
  //   return this.prevSiblings().reduceRight((pre, cur) => pre || cur === that, false);
  // }

  // precedes2(that: Node): Node {
  //   const lastLeafInPrev = this.prevSiblings().reduceRight((pre, cur) => pre || cur.lastLeaf(condition), null);
  //   if (lastLeafInPrev) return lastLeafInPrev;
  //   const parentWithPrev = this.parent(parent => !!parent && !!parent.prev());
  //   if (parentWithPrev) return parentWithPrev.prevLeaf(condition);
  //   return null;
  // }

  // succeeds(that: Node): boolean {
  //   if (this.parent() === that.parent()) return this.index() > that.index();
  //   return this.nextSiblings().reduce((pre, cur) => pre || cur === that, false);
  // }

  __dangerouslyMutateParent(parent: Node): Node {
    this._parent = parent;
    return this;
  }

  __dangerouslyMutateChildren(children: Node[]): Node {
    this._children = children;
    return this;
  }

}