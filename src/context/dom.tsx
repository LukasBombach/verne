import { createContext } from "react";
import { Node } from "../types";

export const domMap = new Map<globalThis.Node, Node>();

const domContext = createContext(domMap);

export default domContext;
