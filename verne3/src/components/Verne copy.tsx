import React from "react";
import { useEventEmitter } from "../hooks";
import { DocumentProvider } from "./DocumentProvider";

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

const Verne = () => {
  return (
    <DocumentProvider document={initalDocument}>
      <div {...containerProps} ref={useEventEmitter()}></div>
    </DocumentProvider>
  );
};

export default Verne;
