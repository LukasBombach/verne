export default class Node<C> {

  private static nextNodeId = 0;

  private _id: number;
  private _originId: number;
  private _parent: Node<any>;
  private _children: Node<any>[];
  private _content: C;

  constructor(parent: Node<any> = null, children: Node<any>[] = [], content: C = null, originId: number = null) {
    this._id = ++Node.nextNodeId;
    this._originId = originId || this._id;
    this._parent = parent;
    this._children = children.map(child => child.setParent(this));
    this._content = content;
  }

  setParent(parent: Node<any>): this {
    this._parent = parent;
    return this;
  }

  replaceNodes(oldNodes: Node<any>[], newNodes: Node<any>[]): Node<C> {
    const newNode = this.clone();

    /*for (let i = 0, len = oldNodes.length; i < len; i++) {
      oldNodes[i].siblings()[oldNodes[i].index] = newNodes[i];
    }
    return this;*/
  }

  clone(): Node<C> {
    const parent = this._parent;
    const children = this._children.map(child => child.clone());
    const content = this._content;
    const originId = this._originId;
    return new Node<C>(parent, children, content, originId);
  }

}