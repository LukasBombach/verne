import React from "react";
import documentContext from "../context/document";
import useDocument from "../hooks/useDocument";
import useContentEditable from "../hooks/useContentEditable";
import useEventHandlers from "../hooks/useEventHandlers";

const Document = () => {
  const { nodes, updateNode } = useDocument();
  const eventHandlers = useEventHandlers();
  const props = useContentEditable();

  return (
    <documentContext.Provider value={{ nodes, updateNode }}>
      >
      <div {...props} {...eventHandlers}>
        {nodes}
      </div>
    </documentContext.Provider>
  );
};

export default Document;
