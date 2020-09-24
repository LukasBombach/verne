import React, { useRef } from "react";

import { VerneDocument, useDocument } from "./Document";

const editorProps = {
  contentEditable: true,
  spellCheck: false,
  suppressContentEditableWarning: true,
  style: { whiteSpace: "pre-wrap" },
} as const;

const Editor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const document = useDocument(editorRef);

  return (
    <div ref={editorRef} {...editorProps}>
      {document.root.children?.map((node, i) => (
        <span key={i}>{node.text}</span>
      ))}
    </div>
  );
};

const Verne = () => {
  return (
    <VerneDocument>
      <Editor />
    </VerneDocument>
  );
};

export default Verne;
