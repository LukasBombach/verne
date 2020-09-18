import React, { useState } from "react";
import { Provider } from "../document";

import type { ReactNode } from "react";
import type { Node } from "../document";

export interface DocumentProviderProps {
  children?: ReactNode;
  document: Node;
}

export const DocumentProvider = (props: DocumentProviderProps) => {
  const [document, setDocument] = useState<Node>(props.document);

  return (
    <Provider value={{ document, setDocument }}>{props.children}</Provider>
  );
};
