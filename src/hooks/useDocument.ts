import { createContext, useContext } from "react";

const DocumentContext = createContext([]);

export default function useDocument() {
  const doc = useContext(DocumentContext);
  return { doc };
}
