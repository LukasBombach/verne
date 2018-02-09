export default class Node {

  private static nextNodeId = 0;

  id: Readonly<number>;
  originId: Readonly<number>;

  constructor(originId: number = null) {
    this.id = ++Node.nextNodeId;
    this.originId = originId || this.id;
  }

}
