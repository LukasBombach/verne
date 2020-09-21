import type { ReactElement } from "react";
import type { Node } from "../document";

export type VC<P = {}> = VerneComponent<P>;
export type VerneComponentProps<P> = P & { node: Node };

export interface VerneComponent<P = {}> {
  (props: VerneComponentProps<P>, context?: any): ReactElement<any, any> | null;
  displayName?: string;
  onKeyDown?: any;
}
