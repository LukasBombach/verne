import { useRef } from "react";
import { useDocument } from "./useDocument";
import { useDom } from "./useDom";
import { useKeyboard } from "./useKeyboard";
import { useMouse } from "./useMouse";

import type { Node } from "./Document";

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
