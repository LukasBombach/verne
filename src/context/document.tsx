import { createContext } from "react";
import { DocumentContext } from "../types";

export const initialValue: DocumentContext = {
  nodes: [],
  updateNode: () => {
    throw new Error("Document has not been initialized yet");
  }
};

const documentContext = createContext<DocumentContext>(initialValue);

export default documentContext;
