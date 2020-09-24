import React from "react";
import { useVerne } from "./useVerne";

const editorProps = {
  contentEditable: true,
  spellCheck: false,
  suppressContentEditableWarning: true,
  style: { whiteSpace: "pre-wrap" },
} as const;

const initalRoot = {
  children: [{ text: "hello " }, { text: "world" }],
};

const Verne = () => {
  const { ref, root } = useVerne(initalRoot);

  return (
    <div ref={ref} {...editorProps}>
      {root.children?.map((node, i) => (
        <span key={i}>{node.text}</span>
      ))}
    </div>
  );
};

export default Verne;
