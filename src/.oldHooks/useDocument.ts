import { useState } from "react";
import useEventHandlers from "./useEventHandlers";
import Document from "../components/Document";

export default function useDocument(nodes = []) {
  const [doc, setDoc] = useState(new Document({ nodes }));
  const eventHandlers = useEventHandlers(doc, setDoc);
  return { doc, eventHandlers };
}
