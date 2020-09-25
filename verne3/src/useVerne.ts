import { useRef } from "react";
import { useDocument, useDom, useKeyboard, useMouse } from "./";

import type { MutableRefObject } from "react";
import type { Node } from "./";

export type UseVerne = ReturnType<typeof useVerne>;
export type UseVerneRef = MutableRefObject<UseVerne | undefined>;

export function useVerne(initialRoot: Node) {
  const verneRef = useRef<UseVerne>();
  const document = useDocument(initialRoot);
  const dom = useDom(verneRef);
  const mouse = useMouse(verneRef);
  useKeyboard(verneRef);

  const api = { ...document, ...dom, ...mouse };
  verneRef.current = api;

  return api;
}
