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

  // ✅
  id(): number {
    return this._id;
  }

  // ✅
  index(): number {
    return this.parent() ? this.siblings().indexOf(this) : 0;
  }

  // ✅
  parent(condition = (node: Node) => true): Node {
    if (condition(this._parent)) return this._parent;
    return this._parent ? this._parent.parent(condition) : null;
  }

  // ✅
  prev(condition = (node: Node) => true): Node {
    const sibling = this.prevSiblings().reverse().find(condition);
    return sibling || null;
  }

  // ✅
  next(condition = (node: Node) => true): Node {
    const sibling = this.nextSiblings().find(condition);
    return sibling || null;
  }

  // ✅
  firstSibling(condition = (node: Node) => true): Node {
    const sibling = this.siblings().find(condition);
    return sibling || null;
  }

  // ✅
  lastSibling(condition = (node: Node) => true): Node {
    const sibling = this.siblings().reverse().find(condition);
    return sibling || null;
  }

  // 😐
  prevLeaf(condition = (node: Node) => true): Node {
    const lastLeafInPrev = this.prevSiblings().reduceRight((pre, cur) => pre || cur.lastLeaf(condition), null);
    if (lastLeafInPrev) return lastLeafInPrev;
    const parentWithPrev = this.parent(parent => !!parent.prev());
    if (parentWithPrev) return parentWithPrev.prevLeaf(condition);
    return null;
  }

  // 😐
  nextLeaf(condition?: (parent: Node) => boolean): Node {
    const firstInNext = this.nextSiblings().reduce((pre, cur) => pre || cur.lastLeaf(condition), null);
    if (firstInNext) return firstInNext;
    const parentWithNext = this.parent(parent => !!parent.next());
    if (parentWithNext) return parentWithNext.nextLeaf(condition);
    return null;
  }

  // ✅
  firstLeaf(condition = (node: Node) => true): Node {
    const children = this.children();
    if (!children.length) return condition(this) ? this : null;
    const firstSibling = this.firstSibling(condition);
    return firstSibling ? firstSibling.firstLeaf() : null;
  }

  // ✅
  lastLeaf(condition = (node: Node) => true): Node {
    const children = this.children();
    if (!children.length) return condition(this) ? this : null;
    const lastSibling = this.lastSibling(condition);
    return lastSibling ? lastSibling.lastLeaf() : null;
  }

  // ✅
  siblings(condition = (node: Node) => true): Node[] {
    const parent = this.parent();
    return parent ? parent.children(condition) : condition(this) ? [this] : [];
  }

  // ✅
  prevSiblings(condition = (node: Node) => true): Node[] {
    return this.siblings(condition).slice(0, this.index());
  }

  // ✅
  nextSiblings(condition = (node: Node) => true): Node[] {
    return this.siblings(condition).slice(this.index() + 1);
  }

  // ✅
  children(condition = (node: Node) => true): Node[] {
    return this._children ? this._children.filter(condition) : [];
  }

  // ✅
  __dangerouslyMutateParent(parent: Node = null): Node {
    this._parent = parent;
    return this;
  }

  // ✅
  __dangerouslyMutateChildren(children: Node[]): Node {
    this._children = children;
    return this;
  }

}