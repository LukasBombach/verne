import React from "react";
import documentContext from "../state/document";
import useDocumentProvider from "../hooks/useDocumentProvider";
import useContentEditable from "../hooks/useContentEditable";
import useEventHandlers from "../hooks/useEventHandlers";

const Document = () => {
  const { nodes, updateNode } = useDocumentProvider();
  const eventHandlers = useEventHandlers();
  const props = useContentEditable();

  return (
    <documentContext.Provider value={{ nodes, updateNode }}>
      <div {...props} {...eventHandlers}>
        {nodes.map(({ Component, props }) => (
          <Component key={props.id} {...props} />
        ))}
      </div>
    </documentContext.Provider>
  );
};

export default Document;
