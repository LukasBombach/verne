// import React, { FC } from "react";
import { KeyDownEvent } from "../event";

export default abstract class Component {
  protected static nextId = 0;
  readonly id = ++Component.nextId;

  abstract async keyDown(event: KeyDownEvent): Promise<any>;

  abstract render(): ReturnType<any>;
}
