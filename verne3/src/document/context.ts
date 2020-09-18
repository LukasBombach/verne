import { createContext } from "react";

import type { Dispatch, SetStateAction } from "react";

export type SetState<T> = Dispatch<SetStateAction<T>>;

export interface Node {
  id: number;
  text?: string;
  children?: Node[];
  properties?: Record<string, any>;
}

export interface DocumentContext {
  document: Node;
  setDocument: SetState<Node>;
}

export const documentContext = createContext<DocumentContext>({
  document: { id: 0 },
  setDocument: () => {
    throw new Error("setDocument has not been initialized yet");
  },
});

export const { Provider, Consumer } = documentContext;
