import { FC } from "react";

export type VC<T = {}> = FC<{ node: T }>;
