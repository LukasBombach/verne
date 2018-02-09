import Node from "./node";

class Tree {

  private children: Node<any>[] = [];

  clone(): Tree {

  }

  replaceNode(oldNode: Node<any>, newNode: Node<any>): this {
    return this.replaceNodes([oldNode], [newNode]);
  }

  deleteNode(nodeToRemove: Node<any>): this {
    return this.deleteNodes([nodeToRemove]);
  }

  replaceNodes(oldNodes: Node<any>[], newNodes: Node<any>[]): this {
    for (let i = 0, len = oldNodes.length; i < len; i++) {
      oldNodes[i].siblings()[oldNodes[i].index] = newNodes[i];
    }
    return this;
  }

  deleteNodes(nodesToRemove: Node<any>[]): this {
    /*const [oldParents, newParents]: [Node<any>[], Node<any>[]] = [[], []];
    Node.groupNodesByParent(nodesToRemove).forEach((children, parent) => {
      oldParents.push(parent);
      newParents.push(parent.deleteChildren(children));
    });
    return this.replaceNodes(oldParents, newParents);*/
  }

  /*private replaceChildren(oldChildren: Node<any>[], newChildren: Node<any>[]): this {
    const children = this.children().map(a => newChildren[oldChildren.findIndex(b => b.originId === a.originId)] || a); // todo WIP!!! using the originId is probably the worst idea ever || please come back to // const children = this.children().map(child => newChildren[oldChildren.indexOf(child)] || child);
    return this.clone({ children });
  }

  private deleteChildren(childrenToRemove: Node<any>[]): this {
    const children = this.children().filter(a => childrenToRemove.findIndex(b => b.originId === a.originId) === -1); // todo WIP!!! using the originId is probably the worst idea ever || please come back to // const children = this.children().filter(child => childrenToRemove.indexOf(child) === -1);
    return this.clone({ children });
  }*/

}