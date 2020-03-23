import { FC } from "react";
import { Node } from "../context/document";

export type VC<T = {}> = FC<{ node: Node<T> }>;
