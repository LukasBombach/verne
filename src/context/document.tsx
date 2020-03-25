import { createContext } from "react";
import { DocumentContext } from "../types";

export const initialValue: DocumentContext = {
  nodes: [],
  updateNode: () => {}
};

const documentContext = createContext<DocumentContext>(initialValue);

export default documentContext;
