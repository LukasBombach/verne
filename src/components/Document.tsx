import React from "react";
import useDocument from "../hooks/useDocument";
import useContentEditable from "../hooks/useContentEditable";
import useEventHandlers from "../hooks/useEventHandlers";
import { Document } from "../types/";

const Document = () => {
  const { doc } = useDocument();
  const eventHandlers = useEventHandlers();
  const props = useContentEditable();

  return (
    <div {...props} {...eventHandlers}>
      {doc}
    </div>
  );
};

export default Document;
