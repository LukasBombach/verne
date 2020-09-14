import React, { useState } from "react";
import Text from "../components/Text";

export interface Node {
  id: number;
  text?: string;
  children?: Node[];
  properties?: Record<string, any>;
}

function useDocument(doc: Node) {
  const [document, setDocument] = useState<Node>(doc);
  const children = document.children?.map((n) => (
    <Text key={n.id} text={n.text} />
  ));
  return children;
}

export default useDocument;
