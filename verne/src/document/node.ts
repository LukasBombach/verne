import WriteEditor from "../write_editor";

export default class Node {

  private static nextNodeId = 0;
  public static editor: WriteEditor;

  public id: Readonly<number>;
  public originId: Readonly<number>;

  constructor(originId: number = null) {
    this.id = ++Node.nextNodeId;
    this.originId = originId || this.id;
  }

  get index(): number {
    return this.parent() ? this.siblings().indexOf(this) : 0;
  }

  get path(): Node[] {
    const parent = this.parent();
    return parent ? [this, ...parent.path] : [this];
  }

  parent(condition = (node: Node) => true): Node {
    const parent = Node.editor.doc.nodeMap.getParent(this);
    if (condition(parent)) return parent;
    return parent ? parent.parent(condition) : null;
  }

  children(condition = (node: Node) => true): Node[] {
    const children = Node.editor.doc.nodeMap.getChildren(this);
    return children ? children.filter(condition) : [];
  }

  prev(condition = (node: Node) => true): Node {
    const sibling = this.prevSiblings().reverse().find(condition);
    return sibling || null;
  }

  next(condition = (node: Node) => true): Node {
    const sibling = this.nextSiblings().find(condition);
    return sibling || null;
  }

  siblings(condition = (node: Node) => true): Node[] {
    const parent = this.parent();
    return parent ? parent.children(condition) : condition(this) ? [this] : [];
  }

  prevSiblings(condition = (node: Node) => true): Node[] {
    return this.siblings(condition).slice(0, this.index);
  }

  nextSiblings(condition = (node: Node) => true): Node[] {
    return this.siblings(condition).slice(this.index + 1);
  }

  nextSiblingsUntil(condition = (node: Node) => false): Node[] {
    const nextSiblings = this.nextSiblings();
    return nextSiblings.slice(0, nextSiblings.findIndex(condition));
  }

  pathUntil(condition = (node: Node) => true): Node[] {
    const parent = this.parent(condition);
    return parent ? [this, ...parent.path] : [this];
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

  comparePositionWith(that: Node): number {
    if (this === that) return 0;
    const [thisIndex, thatIndex] = Node.closestParents(this, that).map(node => node.index);
    return thisIndex < thatIndex ? -1 : thisIndex === thatIndex ? 0 : 1;
  }

  static nodesBetween(firstNode: Node, lastNode: Node): Node[] {
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

  private static closestParents(a: Node, b: Node): [Node, Node] {
    const pathA = a.path;
    const pathB = b.path;
    const index = pathA.findIndex((node, index) => node === pathB[index]);
    return [pathA[index - 1], pathB[index - 1]];
  }

}
