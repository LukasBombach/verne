import { useContext } from "react";
import documentContext from "../context/document";
import { DocumentContext } from "../context/document";

export default function useDocument(): DocumentContext {
  const doc = useContext(documentContext);
  return doc;
}
