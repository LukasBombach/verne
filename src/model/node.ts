import { KeyDownEvent } from "../event";

export default abstract class Node {
  protected static nextId = 0;

  readonly id: number;

  constructor() {
    this.id = ++Node.nextId;
  }

  abstract async keyDown(event: KeyDownEvent): Promise<Node>;
}
