interface CloneProperties {
  parent?: Node;
  children?: Node[];
  originId?: number;
}

export default class Node {

  private static nextNodeId = 0;

  private _id: number;
  private _originId: number;
  private _parent: Node;
  private _children: Node[];

  constructor(parent: Node = null, children: Node[] = [], originId: number = null) {
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

  get index(): number {
    return this.parent() ? this.siblings().indexOf(this) : 0;
  }

  get path(): Node[] {
    const parent = this.parent();
    return parent ? [this, ...parent.path] : [this];
  }

  children(condition = (node: Node) => true): Node[] {
    return this._children ? this._children.filter(condition) : [];
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

  comparePositionWith(that: Node): number {
    if (this === that) return 0;
    const [thisIndex, thatIndex] = Node.closestParents(this, that).map(node => node.index);
    return thisIndex < thatIndex ? -1 : thisIndex === thatIndex ? 0 : 1;
  }

  replaceNode(oldNode: Node, newNode: Node): this {
      return this.replaceNodes([oldNode], [newNode]);
  }

  deleteNode(nodeToRemove: Node): this {
      return this.deleteNodes([nodeToRemove]);
  }

  replaceNodes(oldNodes: Node[], newNodes: Node[]): this {
    return this;
  }

  deleteNodes(nodesToRemove: Node[]): this {
    const [oldParents, newParents]: [Node[], Node[]] = [[], []];
    Node.groupNodesByParent(nodesToRemove).forEach((children, parent) => {
      oldParents.push(parent);
      newParents.push(parent.deleteChildren(children));
    });
    return this.replaceNodes(oldParents, newParents);
  }

  clone(properties: CloneProperties = {}): this {
    const parent = properties.parent || this.parent();
    const children = properties.children || this.children().slice(0);
    const originId = properties.originId || this.originId;
    return new (Node as any)(parent, children, originId);
  }

  private replaceChildren(oldChildren: Node[], newChildren: Node[]): this {
    const children = this.children().map(a => newChildren[oldChildren.findIndex(b => b.originId === a.originId)] || a); // todo WIP!!! using the originId is probably the worst idea ever || please come back to // const children = this.children().map(child => newChildren[oldChildren.indexOf(child)] || child);
    return this.clone({ children });
  }

  private deleteChildren(childrenToRemove: Node[]): this {
    const children = this.children().filter(a => childrenToRemove.findIndex(b => b.originId === a.originId) === -1); // todo WIP!!! using the originId is probably the worst idea ever || please come back to // const children = this.children().filter(child => childrenToRemove.indexOf(child) === -1);
    return this.clone({ children });
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

  private static groupNodesByParent(nodes: Node[]): Map<Node, Node[]> {
    const map = new Map<Node, Node[]>();
    const tuples = nodes.map(node => [node.parent(), node]);
    tuples.forEach(([parent]) => map.set(parent, []));
    tuples.forEach(([parent, node]) => map.get(parent).push(node));
    return map;
  }

}
