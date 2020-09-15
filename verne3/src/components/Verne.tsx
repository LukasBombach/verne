import React from "react";
import { useDocument, useEventListener, useVerne } from "../hooks";
import type { Node } from "../hooks/useDocument";

const initalDocument: Node = {
  id: 0,
  children: [{ id: 1, text: "hello world" }],
};

const Verne = () => {
  const children = useDocument(initalDocument);
  const { dispatchEvent } = useVerne();
  const ref = useEventListener("keydown", (e) => {
    console.log("useEventListener", "keydown", e);
    e.preventDefault();
    dispatchEvent("keydown", e);
  });
  return (
    <div contentEditable={true} suppressContentEditableWarning={true} ref={ref}>
      {children}
    </div>
  );
};

export default Verne;
