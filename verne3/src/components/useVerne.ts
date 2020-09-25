import { useRef } from "react";
import { useDocument } from "./useDocument";
import { useDom } from "./useDom";
import { useKeyboard } from "./useKeyboard";
import { useMouse } from "./useMouse";

import type { Dispatch, SetStateAction, RefObject } from "react";
import type { Node } from "./Document";
import type { Caret } from "./useMouse";

type SetState<T> = Dispatch<SetStateAction<T>>;
type DomNode = globalThis.Node;

export interface VerneApi {
  document: Node;
  ref: RefObject<HTMLDivElement>;
  getTextNode: (node: Node) => DomNode;
  getNode: (textNode: DomNode) => Node;
  insertText: (node: Node, offset: number, textToInsert: string) => void;
  caret: Caret | undefined;
  setCaret: SetState<Caret | undefined>;
}

export function useVerne(initialRoot: Node) {
  const verneApi = useRef<VerneApi>();
  const document = useDocument(initialRoot);
  const dom = useDom(verneApi.current);
  const mouse = useMouse(verneApi.current);
  useKeyboard(verneApi.current);

  const api = { ...document, ...dom, ...mouse };
  verneApi.current = api;

  return api;
}
