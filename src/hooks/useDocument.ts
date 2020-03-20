import React, { useContext } from "react";
import Document from "../model/document";
import Text from "../model/text";

const initalNodes = [new Text("hello world. "), new Text("how are you?")];

const DocumentContext = React.createContext(new Document(initalNodes));

export default function useDocument(): Document {
  const doc = useContext(DocumentContext);
  return doc;
}
