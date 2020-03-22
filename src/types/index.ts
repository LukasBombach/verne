import { FC } from "react";

export type Node = FC;
export type Document = Node[];

export type VC<T = {}> = FC<{ node: T }>;
