import { useEvent } from ".";

import type { Node } from "../document";

interface Caret {
  offset?: number;
}

export function useVerne() {
  // function onKeyDown(
  //   handler: (key: string) => void,
  //   options?: { preventDefault?: boolean }
  // ) {}

  // const onKeyDown = useEvent("keydown");

  function insertText(node: Node, offset: number | undefined, key: string) {}

  const caret: Caret = {};

  return { onKeyDown, insertText, caret };
}
