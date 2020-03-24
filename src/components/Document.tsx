import React from "react";
import documentContext from "../context/document";
import DocumentProvider from "../hooks/useDocumentProvider";
import useContentEditable from "../hooks/useContentEditable";
import useEventHandlers from "../hooks/useEventHandlers";

const Document = () => {
  const { nodes, updateNode } = DocumentProvider();
  const eventHandlers = useEventHandlers();
  const props = useContentEditable();

  return (
    <documentContext.Provider value={{ nodes, updateNode }}>
      <div {...props} {...eventHandlers}>
        {nodes.map(({ Node, ...node }: any) => (
          <Node key={node.id} node={node} />
        ))}
      </div>
    </documentContext.Provider>
  );
};

export default Document;
