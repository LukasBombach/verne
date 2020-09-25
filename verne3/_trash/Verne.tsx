import React, { useState } from "react";
import { Provider } from "../document";
import { useEventEmitter } from "../hooks";
import { Text } from "./Text";

import type { Node } from "../document";

const initalDocument: Node = {
  id: 0,
  children: [
    { id: 1, text: "hello " },
    { id: 2, text: "world" },
  ],
};

const containerProps = {
  contentEditable: true,
  spellCheck: false,
  suppressContentEditableWarning: true,
  style: { whiteSpace: "pre-wrap" },
} as const;

export const Verne = () => {
  const [document, setDocument] = useState<Node>(initalDocument);
  const elementRef = useEventEmitter();

  const children =
    document.children?.map(node => <Text key={node.id} node={node} />) ?? null;

  return (
    <Provider value={{ document, setDocument }}>
      <div {...containerProps} ref={elementRef}>
        {children}
      </div>
    </Provider>
  );
};

export default Verne;
