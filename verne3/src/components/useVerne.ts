import { useDocument } from "./useDocument";
import { useDom } from "./useDom";
import { useKeyboard } from "./useKeyboard";
import { useMouse } from "./useMouse";

import type { Node } from "./Document";

export function useVerne(initialRoot: Node) {
  const { document, getNode, insertText } = useDocument(initialRoot);
  const { ref, getTextNode } = useDom(document);
  const caret = useMouse(getNode);
  useKeyboard(ref, caret, insertText);

  return { document, ref, getTextNode, getNode, insertText };
}
