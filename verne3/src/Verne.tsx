import React from "react";
import { useVerne } from ".";
import type { Node } from ".";

export interface VerneProps {
  document: Node;
}

const Verne = (props: VerneProps) => {
  const { ref, document } = useVerne(props.document);

  return (
    <div
      ref={ref}
      contentEditable={true}
      spellCheck={false}
      suppressContentEditableWarning={true}
      style={{ whiteSpace: "pre-wrap" }}
    >
      {document.children?.map((node, i) => (
        <span key={i}>{node.text}</span>
      ))}
    </div>
  );
};

export default Verne;
