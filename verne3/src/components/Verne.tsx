import React, { useState } from "react";
import { Provider } from "../document";
import { useEventEmitter } from "../hooks";
import { Text } from "./Text";

import type { Node } from "../document";

const initalDocument: Node = {
  id: 0,
  children: [{ id: 1, text: "hello world" }],
};

const containerProps = {
  contentEditable: true,
  spellCheck: false,
  suppressContentEditableWarning: true,
  style: { whiteSpace: "pre-wrap" },
} as const;

export const Verne = () => {
  const [document, setDocument] = useState<Node>(initalDocument);
  const ref = useEventEmitter();

  const children =
    document.children?.map((node) => <Text key={node.id} text={node.text} />) ??
    null;

  return (
    <Provider value={{ document, setDocument }}>
      <div {...containerProps} ref={ref}>
        {children}
      </div>
    </Provider>
  );
};

export default Verne;
