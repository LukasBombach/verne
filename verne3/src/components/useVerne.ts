import { useDom } from "./useDom";
import { useDocument } from "./useDocument";

import type { Node } from "./Document";

export function useVerne(initialRoot: Node) {
  const { root, getNode, insertText } = useDocument(initialRoot);
  const { ref, getTextNode } = useDom(root);
  useKeyboard({ ref, insertText });
  useMouse({ root, getNode });

  return { root, ref, getTextNode, getNode, insertText };
}
