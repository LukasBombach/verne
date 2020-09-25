import { useRef } from "react";
import { useDocument, useDom, useKeyboard, useMouse } from ".";
import type { Node } from ".";

export type UseVerne = ReturnType<typeof useVerne>;

export function useVerne(initialRoot: Node) {
  const verneApi = useRef<UseVerne>();
  const document = useDocument(initialRoot);
  const dom = useDom(verneApi.current);
  const mouse = useMouse(verneApi.current);
  useKeyboard(verneApi.current);

  const api = { ...document, ...dom, ...mouse };
  verneApi.current = api;

  return api;
}
