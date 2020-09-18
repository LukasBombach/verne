import { useState } from "react";
import type { Node } from "../document";

export function useDocument(initialDocument: Node) {
  const [document, setDocument] = useState<Node>(initialDocument);
}
