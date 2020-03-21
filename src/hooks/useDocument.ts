import { useState } from "react";
import useEventHandlers from "./useEventHandlers";
import Document from "../model/document";
import Text from "../model/text";

const initalDocument = new Document([
  new Text("hello world. "),
  new Text("how are you?")
]);

export default function useDocument() {
  const [doc, setDoc] = useState(initalDocument);
  const eventHandlers = useEventHandlers(doc, setDoc);
  return { doc, eventHandlers };
}
