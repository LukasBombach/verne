import { useDocument } from "./useDocument";
import { useDom } from "./useDom";
import { useKeyboard } from "./useKeyboard";

import type { Node } from "./Document";

export function useVerne(initialRoot: Node) {
  const { document, getNode, insertText } = useDocument(initialRoot);
  const { ref, getTextNode } = useDom(document);
  useKeyboard(ref, insertText);
  // useMouse(document, getNode);

  return { document, ref, getTextNode, getNode, insertText };
}
