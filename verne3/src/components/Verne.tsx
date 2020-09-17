import React from "react";
import { useDocument, useEventEmitter } from "../hooks";
import type { Node } from "../hooks/useDocument";

const initalDocument: Node = {
  id: 0,
  children: [{ id: 1, text: "hello world" }],
};

const Verne = () => {
  const children = useDocument(initalDocument);
  const ref = useEventEmitter();

  return (
    <div
      contentEditable={true}
      spellCheck={false}
      suppressContentEditableWarning={true}
      ref={ref}
      style={{ whiteSpace: "pre-wrap" }}
    >
      {children}
    </div>
  );
};

export default Verne;
