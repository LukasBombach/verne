// import Text from "./text";
//
// interface WalkOptions {
//   startOffset: number;
//   byCharacters: number;
// }
//
// interface WalkResult {
//   node: Text;
//   offset: number;
// }

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

  parent(): Node {
    return this._parent;
  }

  prev(): Node {
    const index = this.index();
    return index === 0 ? null : this.siblings()[index - 1];
  }

  next(): Node {
    const index = this.index();
    const siblings = this.siblings();
    return index === siblings.length - 1 ? null : siblings[index + 1];
  }

  firstSibling() {
    return this.siblings()[0];
  }

  lastSibling() {
    const siblings = this.siblings();
    return siblings[siblings.length];
  }

  prevInTree(): Node {
    const prev = this.prev();
    if (prev) return prev;
    const parent = this.parent();
    const parentPrev = parent.prev();
  }

  nextInTree(): Node {

  }

  firstInTree(): Node {
    const firstSibling = this.firstSibling();
    const children = firstSibling.children();
    if (!children.length) return firstSibling;
    return children[0].firstInTree();
  }

  lastInTree(): Node {
    const lastSibling = this.lastSibling();
    const children = lastSibling.children();
    if (!children.length) return lastSibling;
    return children[children.length].lastInTree();
  }

  siblings(): Node[] {
    return this.parent().children();
  }

  children(): Node[] {
    return this._children;
  }

  hasChild(node: Node): boolean {
    return this.children().indexOf(node) !== -1;
  }

  // todo instead of checking with hasChild this should traverse down the siblings to check if that node is there
  precedes(that: Node): boolean {
    const thisIndex = this.index();
    const thatIndex = that.index();
    if (thatIndex !== -1) return thatIndex < thisIndex;
    const siblings = this.siblings();
    for (let i = thisIndex; i >= 0; --i) if (siblings[i].hasChild(that)) return true;
    return false;
  }

  // todo instead of checking with hasChild this should traverse down the siblings to check if that node is there
  succeeds(that: Node): boolean {
    const thisIndex = this.index();
    const thatIndex = that.index();
    if (thatIndex !== -1) return thatIndex < thisIndex;
    const siblings = this.siblings();
    for (let i = thisIndex; i < siblings.length; ++i) if (siblings[i].hasChild(that)) return true;
    return false;
  }

  // walk({ startOffset, byCharacters }: WalkOptions): WalkResult {
  //
  // }

  __dangerouslyMutateParent(parent: Node = null): Node {
    this._parent = parent;
    return this;
  }

}