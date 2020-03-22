import React from "react";
import { KeyDownEvent } from "../events";

export default abstract class Component<P = {}> extends React.Component {
  protected static nextId = 0;
  readonly id: number;
  readonly props: P;

  constructor(props: P) {
    super(props);
    this.id = ++Component.nextId;
    this.props = props;
  }

  abstract async keyDown(event: KeyDownEvent): Promise<any>;

  // abstract render(): ReturnType<any>;
}
