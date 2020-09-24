import React from "react";
import { VerneDocument, useDocument } from "./Document";

const editorProps = {
  contentEditable: true,
  spellCheck: false,
  suppressContentEditableWarning: true,
  style: { whiteSpace: "pre-wrap" },
} as const;

const Editor = () => {
  const document = useDocument();

  return (
    <div ref={document.ref} {...editorProps}>
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
