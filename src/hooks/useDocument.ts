import { useState } from "react";
import Document from "../model/document";
import TextNode from "../model/textNode";

const initalNodes = [
  new TextNode("hello world. "),
  new TextNode("how are you?")
];

export default function useDocument(): Document {
  const [doc] = useState<Document>(new Document(initalNodes));
  return doc;
}
